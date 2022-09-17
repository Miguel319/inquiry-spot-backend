import { VehicleTypeUpdatedEvent } from "@/vehicle-post/application/events";
import { VehicleTypeTranslations } from "@/vehicle-post/application/translations";
import { VehicleType } from "@/vehicle-post/domain/entities";
import { IVehicleType } from "@/vehicle-post/domain/types/i-vehicle-type";
import { VehicleTypeEntityRepository } from "@/vehicle-post/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateVehicleTypeCommand } from "../../operations";

@CommandHandler(UpdateVehicleTypeCommand)
export class UpdateVehicleTypeCommandHandler
  implements ICommandHandler<UpdateVehicleTypeCommand>
{
  constructor(
    private readonly _vehicleEntityRepository: VehicleTypeEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getVehicleType(
    _id: string,
    i18n: I18nContext,
  ): Promise<VehicleType> {
    const vehicleType = await this._vehicleEntityRepository.findByValue(
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

  async execute({
    _id,
    updateVehicleTypeDto,
    i18n,
  }: UpdateVehicleTypeCommand): Promise<void> {
    const vehicleTypeFound = await this.getVehicleType(_id, i18n);

    const vehicleType =
      this.eventPublisher.mergeObjectContext(vehicleTypeFound);

    vehicleType.updateVehicle(updateVehicleTypeDto as unknown as IVehicleType);

    vehicleType.apply(
      new VehicleTypeUpdatedEvent(vehicleType.getId(), vehicleType.getName()),
    );

    await this._vehicleEntityRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      vehicleType,
    );

    vehicleType.commit();
  }
}
