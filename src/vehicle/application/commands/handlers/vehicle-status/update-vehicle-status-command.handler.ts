import { VehicleStatusUpdatedEvent } from "@/vehicle/application/events";
import { VehicleStatusTranslations } from "@/vehicle/application/translations";
import { VehicleStatus } from "@/vehicle/domain/entities";
import { IVehicleStatus } from "@/vehicle/domain/types";
import { UpdateVehicleStatusDto } from "@/vehicle/infrastructure/dtos";
import { VehicleStatusEntityRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateVehicleStatusCommand } from "../../operations";

@CommandHandler(UpdateVehicleStatusCommand)
export class UpdateVehicleStatusCommandHandler
  implements ICommandHandler<UpdateVehicleStatusCommand>
{
  constructor(
    private readonly _vehicleStatusRepository: VehicleStatusEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getVehicleStatus(
    _id: string,
    i18n: I18nContext,
  ): Promise<VehicleStatus> {
    const vehicleStatus = await this._vehicleStatusRepository.findByValue(
      _id,
      "_id",
    );

    if (!vehicleStatus)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehicleStatusTranslations.NOT_FOUND)
          : this._i18n.t(VehicleStatusTranslations.NOT_FOUND),
      );

    return vehicleStatus;
  }

  private async checkDuplicates(
    vehicleStatus: VehicleStatus,
    updateVehicleStatusDto: UpdateVehicleStatusDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound = await this._vehicleStatusRepository.findOneEntity({
      $or: [
        { "name.es": updateVehicleStatusDto.name.es },
        { "name.en": updateVehicleStatusDto.name.en },
      ],
    });

    const exists = entityFound && entityFound.getId() !== vehicleStatus.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(VehicleStatusTranslations.NAME_DUPLICATE)
          : this._i18n.t(VehicleStatusTranslations.NAME_DUPLICATE),
      );
  }

  async execute({
    _id,
    updateVehicleStatusDto,
    i18n,
  }: UpdateVehicleStatusCommand): Promise<void> {
    const vehicleStatusFound = await this.getVehicleStatus(_id, i18n);

    await this.checkDuplicates(
      vehicleStatusFound,
      updateVehicleStatusDto,
      i18n,
    );

    const vehicleStatus =
      this.eventPublisher.mergeObjectContext(vehicleStatusFound);

    vehicleStatus.updateVehicleStatus(
      updateVehicleStatusDto as unknown as IVehicleStatus,
    );

    vehicleStatus.apply(
      new VehicleStatusUpdatedEvent(
        vehicleStatus.getId(),
        vehicleStatus.getName(),
      ),
    );

    await this._vehicleStatusRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      vehicleStatus,
    );

    vehicleStatus.commit();
  }
}
