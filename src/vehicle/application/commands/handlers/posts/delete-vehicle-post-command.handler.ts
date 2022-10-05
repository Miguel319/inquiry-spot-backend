import { VehiclePostTranslations } from "@/vehicle/application/translations";
import { VehiclePost } from "@/vehicle/domain/entities";
import { VehiclePostEntityRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteVehiclePostCommand } from "../..";

@CommandHandler(DeleteVehiclePostCommand)
export class DeleteVehiclePostCommandHandler
  implements ICommandHandler<DeleteVehiclePostCommand>
{
  constructor(
    private readonly _vehiclePostEntityRepository: VehiclePostEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getVehiclePost(
    _id: string,
    i18n: I18nContext,
  ): Promise<VehiclePost> {
    const vehiclePost = await this._vehiclePostEntityRepository.findByValue(
      _id,
      "_id",
    );

    if (!vehiclePost)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehiclePostTranslations.NOT_FOUND)
          : this._i18n.t(VehiclePostTranslations.NOT_FOUND),
      );

    return vehiclePost;
  }

  async execute({ _id, i18n }: DeleteVehiclePostCommand): Promise<boolean> {
    const vehiclePostFound = await this.getVehiclePost(_id, i18n);

    const vehiclePost =
      this.eventPublisher.mergeObjectContext(vehiclePostFound);

    const deleteCount = await this._vehiclePostEntityRepository.delete(
      _id,
      "_id",
    );

    vehiclePost.commit();

    return deleteCount;
  }
}
