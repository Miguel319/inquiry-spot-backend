import { VehicleMakeTranslations } from "@/vehicle/application/translations";
import { VehicleMake } from "@/vehicle/domain/entities";
import { IVehicleMake } from "@/vehicle/domain/types";
import { UpdateVehicleMakeDto } from "@/vehicle/infrastructure/dtos";
import { VehicleMakesEntityRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateVehicleMakeCommand } from "../../operations";

@CommandHandler(UpdateVehicleMakeCommand)
export class UpdateVehicleMakeCommandHandler
  implements ICommandHandler<UpdateVehicleMakeCommand>
{
  constructor(
    private readonly _vehicleMakeEntityRepository: VehicleMakesEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getVehicleMake(
    _id: string,
    i18n: I18nContext,
  ): Promise<VehicleMake> {
    const vehicleType = await this._vehicleMakeEntityRepository.findByValue(
      _id,
      "_id",
    );

    if (!vehicleType)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehicleMakeTranslations.NOT_FOUND)
          : this._i18n.t(VehicleMakeTranslations.NOT_FOUND),
      );

    return vehicleType;
  }

  private async checkDuplicates(
    vehicleType: VehicleMake,
    updateVehicleMakeDto: UpdateVehicleMakeDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound = await this._vehicleMakeEntityRepository.findOneEntity({
      name: updateVehicleMakeDto.name,
    });

    const exists = entityFound && entityFound.getId() !== vehicleType.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(VehicleMakeTranslations.NAME_DUPLICATE)
          : this._i18n.t(VehicleMakeTranslations.NAME_DUPLICATE),
      );
  }

  async execute({
    _id,
    updateVehicleMakeDto,
    i18n,
  }: UpdateVehicleMakeCommand): Promise<void> {
    const vehicleMakeFound = await this.getVehicleMake(_id, i18n);

    await this.checkDuplicates(vehicleMakeFound, updateVehicleMakeDto, i18n);

    const vehicleMake =
      this.eventPublisher.mergeObjectContext(vehicleMakeFound);

    vehicleMake.updateMake(updateVehicleMakeDto as unknown as IVehicleMake);

    await this._vehicleMakeEntityRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      vehicleMake,
    );

    vehicleMake.commit();
  }
}
