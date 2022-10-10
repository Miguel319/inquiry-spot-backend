import { IVehiclePostsService } from "@/vehicle/application/services/contracts";
import { VehiclePostTranslations } from "@/vehicle/application/translations";
import { VehiclePost } from "@/vehicle/domain/entities";
import { IVehiclePost } from "@/vehicle/domain/types";
import { VehiclePostEntityRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateVehiclePostCommand } from "../../operations";

@CommandHandler(UpdateVehiclePostCommand)
export class UpdateVehiclePostCommandHandler
  implements ICommandHandler<UpdateVehiclePostCommand>
{
  constructor(
    private readonly _vehiclePostRepository: VehiclePostEntityRepository,
    private readonly eventPublisher: EventPublisher,
    @Inject("IVehiclePostsService")
    private readonly _vehiclePostsService: IVehiclePostsService,
    private readonly _i18n: I18nService,
  ) {}

  private async getVehiclePost(
    _id: string,
    i18n: I18nContext,
  ): Promise<VehiclePost> {
    const cleanId = _id.replace(",", "");

    const vehiclePost = await this._vehiclePostRepository.findByValue(
      cleanId,
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

  async execute({
    _id,
    updateVehiclePostDto: dto,
    i18n,
  }: UpdateVehiclePostCommand): Promise<void> {
    const vehiclePostFound = await this.getVehiclePost(_id, i18n);

    const vehiclePost =
      this.eventPublisher.mergeObjectContext(vehiclePostFound);

    await this._vehiclePostsService.mapToEntities(
      vehiclePost,
      i18n,
      "edit",
      dto,
    );

    vehiclePost.updateVehiclePost(dto as unknown as IVehiclePost);

    await this._vehiclePostRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      vehiclePost,
    );

    vehiclePost.commit();
  }
}
