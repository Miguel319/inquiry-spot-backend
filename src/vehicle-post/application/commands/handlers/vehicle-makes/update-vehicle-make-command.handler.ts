import { VehicleMakeTranslations } from "@/vehicle-post/application/translations";
import { VehicleMake } from "@/vehicle-post/domain/entities";
import { IVehicleMake } from "@/vehicle-post/domain/types";
import { VehicleMakesEntityRepository } from "@/vehicle-post/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
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

  async execute({
    _id,
    i18n,
    updateVehicleMakeDto,
  }: UpdateVehicleMakeCommand): Promise<void> {
    const vehicleMakeFound = await this.getVehicleMake(_id, i18n);

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
