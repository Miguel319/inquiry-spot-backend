import { IVehiclePostsService } from "@/vehicle/application/services/contracts";
import { IVehiclePost } from "@/vehicle/domain/types";
import { VehiclePostEntityRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
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
  ) {}

  async execute({
    _id,
    updateVehiclePostDto: dto,
    i18n,
  }: UpdateVehiclePostCommand): Promise<void> {
    const vehiclePostFound = await this._vehiclePostsService.findById(
      _id,
      i18n,
    );

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
