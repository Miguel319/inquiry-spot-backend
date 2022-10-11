import { IPropertyPostsService } from "@/real-state/application/services/contracts";
import { IPropertyPost } from "@/real-state/domain";
import { PropertyPostEntityRepository } from "@/real-state/infrastructure/persistence/repositories";
import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePropertyPostCommand } from "../../operations";

@CommandHandler(UpdatePropertyPostCommand)
export class UpdatePropertyPostCommandHandler
  implements ICommandHandler<UpdatePropertyPostCommand>
{
  constructor(
    private readonly _propertyPostRepository: PropertyPostEntityRepository,
    private readonly eventPublisher: EventPublisher,
    @Inject("IPropertyPostsService")
    private readonly _propertyPostsService: IPropertyPostsService,
  ) {}

  async execute({
    _id,
    updatePropertyPostDto: dto,
    i18n,
  }: UpdatePropertyPostCommand): Promise<void> {
    const propertyPostFound = await this._propertyPostsService.findById(
      _id,
      i18n,
    );

    const propertyPost =
      this.eventPublisher.mergeObjectContext(propertyPostFound);

    await this._propertyPostsService.mapToEntities(
      propertyPost,
      i18n,
      "edit",
      dto,
    );

    propertyPost.updatePropertyPost(dto as unknown as IPropertyPost);

    await this._propertyPostRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      propertyPost,
    );

    propertyPost.commit();
  }
}
