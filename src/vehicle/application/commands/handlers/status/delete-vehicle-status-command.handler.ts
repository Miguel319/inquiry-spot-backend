import { VehicleStatusTranslations } from "@/vehicle/application/translations";
import { VehicleStatus } from "@/vehicle/domain/entities";
import {
  VehiclePostsRepository,
  VehicleStatusEntityRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Types } from "mongoose";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteVehicleStatusCommand } from "../..";

@CommandHandler(DeleteVehicleStatusCommand)
export class DeleteVehicleStatusCommandHandler
  implements ICommandHandler<DeleteVehicleStatusCommand>
{
  constructor(
    private readonly _vehicleStatusEntityRepository: VehicleStatusEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _vehiclePostRepository: VehiclePostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  private async getVehicleStatus(
    _id: string,
    i18n: I18nContext,
  ): Promise<VehicleStatus> {
    const vehicleStatus = await this._vehicleStatusEntityRepository.findByValue(
      new Types.ObjectId(_id),
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

  private async handleAuthorization(
    status: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const postFound = await this._vehiclePostRepository.findOne({
      "status._id": status,
    });

    if (postFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(VehicleStatusTranslations.FORBIDDEN_DELETION)
          : this._i18n.t(VehicleStatusTranslations.FORBIDDEN_DELETION),
      );
  }

  async execute({ _id, i18n }: DeleteVehicleStatusCommand): Promise<boolean> {
    const vehicleStatusFound = await this.getVehicleStatus(_id, i18n);

    await this.handleAuthorization(vehicleStatusFound.getId(), i18n);

    const vehicleStatus =
      this.eventPublisher.mergeObjectContext(vehicleStatusFound);

    const deleteCount = await this._vehicleStatusEntityRepository.delete(
      _id,
      "_id",
    );

    vehicleStatus.commit();

    return deleteCount;
  }
}
