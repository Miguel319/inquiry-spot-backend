import { VehicleMakeTranslations } from "@/vehicle/application/translations";
import { VehicleMake } from "@/vehicle/domain/entities";
import {
  VehicleMakesEntityRepository,
  VehiclePostsRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteVehicleMakeCommand } from "../..";

@CommandHandler(DeleteVehicleMakeCommand)
export class DeleteVehicleMakeCommandHandler
  implements ICommandHandler<DeleteVehicleMakeCommand>
{
  constructor(
    private readonly _vehicleMakeEntityRepository: VehicleMakesEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _vehiclePostRepository: VehiclePostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  private async getVehicleMake(
    _id: string,
    i18n: I18nContext,
  ): Promise<VehicleMake> {
    const vehicleMake = await this._vehicleMakeEntityRepository.findByValue(
      _id,
      "_id",
    );

    if (!vehicleMake)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehicleMakeTranslations.NOT_FOUND)
          : this._i18n.t(VehicleMakeTranslations.NOT_FOUND),
      );

    return vehicleMake;
  }

  private async handleAuthorization(
    type: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const postFound = await this._vehiclePostRepository.findOne({
      type,
    });

    if (postFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(VehicleMakeTranslations.FORBIDDEN_DELETION)
          : this._i18n.t(VehicleMakeTranslations.FORBIDDEN_DELETION),
      );
  }

  async execute({ _id, i18n }: DeleteVehicleMakeCommand): Promise<boolean> {
    const vehicleMakeFound = await this.getVehicleMake(_id, i18n);

    await this.handleAuthorization(vehicleMakeFound.getId(), i18n);

    const vehicleMake =
      this.eventPublisher.mergeObjectContext(vehicleMakeFound);

    const deleteCount = await this._vehicleMakeEntityRepository.delete(
      _id,
      "_id",
    );

    vehicleMake.commit();

    return deleteCount;
  }
}
