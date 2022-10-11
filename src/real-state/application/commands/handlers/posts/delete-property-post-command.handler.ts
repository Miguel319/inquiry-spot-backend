import { PropertyTypeTranslations } from "@/real-state/application/translations";
import { PropertyPost } from "@/real-state/domain/entities";
import { PropertyPostEntityRepository } from "@/real-state/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeletePropertyPostCommand } from "../..";

@CommandHandler(DeletePropertyPostCommand)
export class DeletePropertyPostCommandHandler
  implements ICommandHandler<DeletePropertyPostCommand>
{
  constructor(
    private readonly _propertyPostEntityRepository: PropertyPostEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getPropertyPost(
    _id: string,
    i18n: I18nContext,
  ): Promise<PropertyPost> {
    const propertyPost = await this._propertyPostEntityRepository.findByValue(
      _id,
      "_id",
    );

    if (!propertyPost)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyTypeTranslations.NOT_FOUND)
          : this._i18n.t(PropertyTypeTranslations.NOT_FOUND),
      );

    return propertyPost;
  }

  async execute({ _id, i18n }: DeletePropertyPostCommand): Promise<boolean> {
    const propertyPostFound = await this.getPropertyPost(_id, i18n);

    const propertyPost =
      this.eventPublisher.mergeObjectContext(propertyPostFound);

    const deleteCount = await this._propertyPostEntityRepository.delete(
      _id,
      "_id",
    );

    propertyPost.commit();

    return deleteCount;
  }
}
