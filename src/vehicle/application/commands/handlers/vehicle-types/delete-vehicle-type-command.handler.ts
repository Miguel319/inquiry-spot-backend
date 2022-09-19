import { VehicleTypeTranslations } from "@/vehicle/application/translations";
import { VehicleType } from "@/vehicle/domain/entities";
import {
  VehiclePostsRepository,
  VehicleTypeEntityRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteVehicleTypeCommand } from "../..";

@CommandHandler(DeleteVehicleTypeCommand)
export class DeleteVehicleTypeCommandHandler
  implements ICommandHandler<DeleteVehicleTypeCommand>
{
  constructor(
    private readonly _vehicleTypeEntityRepository: VehicleTypeEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _vehiclePostRepository: VehiclePostsRepository,
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

  async handleAuthorization(
    type: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const postFound = await this._vehiclePostRepository.findOne({
      type,
    });

    if (postFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(VehicleTypeTranslations.FORBIDDEN_DELETION)
          : this._i18n.t(VehicleTypeTranslations.FORBIDDEN_DELETION),
      );
  }

  async execute({ _id, i18n }: DeleteVehicleTypeCommand): Promise<boolean> {
    const vehicleTypeFound = await this.getVehicleType(_id, i18n);

    await this.handleAuthorization(vehicleTypeFound.getId(), i18n);

    const vehicleType =
      this.eventPublisher.mergeObjectContext(vehicleTypeFound);

    const deleteCount = await this._vehicleTypeEntityRepository.delete(
      _id,
      "_id",
    );

    vehicleType.commit();

    return deleteCount;
  }
}
