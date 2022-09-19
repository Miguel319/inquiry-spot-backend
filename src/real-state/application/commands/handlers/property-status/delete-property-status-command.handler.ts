import { PropertyStatusTranslations } from "@/real-state/application/translations";
import { PropertyStatus } from "@/real-state/domain/entities";
import {
  PropertyPostsRepository,
  PropertyStatusEntityRepository,
} from "@/real-state/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeletePropertyStatusCommand } from "../..";

@CommandHandler(DeletePropertyStatusCommand)
export class DeletePropertyStatusCommandHandler
  implements ICommandHandler<DeletePropertyStatusCommand>
{
  constructor(
    private readonly _propertyStatusEntityRepository: PropertyStatusEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _propertyPostRepository: PropertyPostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  private async getPropertyStatus(
    _id: string,
    i18n: I18nContext,
  ): Promise<PropertyStatus> {
    const propertyStatus =
      await this._propertyStatusEntityRepository.findByValue(_id, "_id");

    if (!propertyStatus)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyStatusTranslations.NOT_FOUND)
          : this._i18n.t(PropertyStatusTranslations.NOT_FOUND),
      );

    return propertyStatus;
  }

  private async handleAuthorization(
    type: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const postFound = await this._propertyPostRepository.findOne({
      type,
    });

    if (postFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(PropertyStatusTranslations.FORBIDDEN_DELETION)
          : this._i18n.t(PropertyStatusTranslations.FORBIDDEN_DELETION),
      );
  }

  async execute({ _id, i18n }: DeletePropertyStatusCommand): Promise<boolean> {
    const propertyStatusFound = await this.getPropertyStatus(_id, i18n);

    await this.handleAuthorization(propertyStatusFound.getId(), i18n);

    const propertyStatus =
      this.eventPublisher.mergeObjectContext(propertyStatusFound);

    const deleteCount = await this._propertyStatusEntityRepository.delete(
      _id,
      "_id",
    );

    propertyStatus.commit();

    return deleteCount;
  }
}
