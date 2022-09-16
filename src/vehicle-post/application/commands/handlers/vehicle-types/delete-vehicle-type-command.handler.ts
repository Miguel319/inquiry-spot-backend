import { VehicleTypeDeletedEvent } from "@/vehicle-post/application/events";
import { VehicleTypeTranslations } from "@/vehicle-post/application/translations";
import { VehicleType } from "@/vehicle-post/domain/entities";
import { VehicleTypeEntityRepository } from "@/vehicle-post/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteVehicleTypeCommand } from "../../operations";

@CommandHandler(DeleteVehicleTypeCommand)
export class DeleteVehicleTypeCommandHandler
  implements ICommandHandler<DeleteVehicleTypeCommand>
{
  constructor(
    private readonly _vehicleTypeEntityRepository: VehicleTypeEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getVehicleType(
    _id: string,
    i18n: I18nContext,
  ): Promise<VehicleType> {
    const vehicleType = await this._vehicleTypeEntityRepository.findByValue(
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

  async execute({ _id, i18n }: DeleteVehicleTypeCommand): Promise<boolean> {
    const vehicleTypeFound = await this.getVehicleType(_id, i18n);

    const vehicleType =
      this.eventPublisher.mergeObjectContext(vehicleTypeFound);

    const deleteCount = await this._vehicleTypeEntityRepository.delete(
      _id,
      "_id",
    );

    vehicleType.apply(new VehicleTypeDeletedEvent(vehicleType.getId()));

    vehicleType.commit();

    return deleteCount;
  }
}
