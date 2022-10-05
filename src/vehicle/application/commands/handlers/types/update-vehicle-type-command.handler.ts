import { VehicleTypeUpdatedEvent } from "@/vehicle/application/events";
import { VehicleTypeTranslations } from "@/vehicle/application/translations";
import { VehicleType } from "@/vehicle/domain/entities";
import { IVehicleType } from "@/vehicle/domain/types";
import { UpdateVehicleTypeDto } from "@/vehicle/infrastructure/dtos";
import { VehicleTypeEntityRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateVehicleTypeCommand } from "../../operations";

@CommandHandler(UpdateVehicleTypeCommand)
export class UpdateVehicleTypeCommandHandler
  implements ICommandHandler<UpdateVehicleTypeCommand>
{
  constructor(
    private readonly _vehicleTypeRepository: VehicleTypeEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getVehicleType(
    _id: string,
    i18n: I18nContext,
  ): Promise<VehicleType> {
    const vehicleType = await this._vehicleTypeRepository.findByValue(
      _id,
      "_id",
    );

    if (!vehicleType)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehicleTypeTranslations.NOT_FOUND)
          : this._i18n.t(VehicleTypeTranslations.NOT_FOUND),
      );

    return vehicleType;
  }

  private async checkDuplicates(
    vehicleType: VehicleType,
    updateVehicleTypeDto: UpdateVehicleTypeDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound = await this._vehicleTypeRepository.findOneEntity({
      $or: [
        { "name.es": updateVehicleTypeDto.name.es },
        { "name.en": updateVehicleTypeDto.name.en },
      ],
    });

    const exists = entityFound && entityFound.getId() !== vehicleType.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(VehicleTypeTranslations.NAME_DUPLICATE)
          : this._i18n.t(VehicleTypeTranslations.NAME_DUPLICATE),
      );
  }

  async execute({
    _id,
    updateVehicleTypeDto,
    i18n,
  }: UpdateVehicleTypeCommand): Promise<void> {
    const vehicleTypeFound = await this.getVehicleType(_id, i18n);

    await this.checkDuplicates(vehicleTypeFound, updateVehicleTypeDto, i18n);

    const vehicleType =
      this.eventPublisher.mergeObjectContext(vehicleTypeFound);

    vehicleType.updateVehicleType(
      updateVehicleTypeDto as unknown as IVehicleType,
    );

    vehicleType.apply(
      new VehicleTypeUpdatedEvent(vehicleType.getId(), vehicleType.getName()),
    );

    await this._vehicleTypeRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      vehicleType,
    );

    vehicleType.commit();
  }
}
