import { PropertyTypeTranslations } from "@/property-post/application/translations";
import { PropertyType } from "@/property-post/domain/entities";
import {
  PropertyPostsRepository,
  PropertyTypeEntityRepository,
} from "@/property-post/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeletePropertyTypeCommand } from "../..";

@CommandHandler(DeletePropertyTypeCommand)
export class DeletePropertyTypeCommandHandler
  implements ICommandHandler<DeletePropertyTypeCommand>
{
  constructor(
    private readonly _propertyTypeEntityRepository: PropertyTypeEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _propertyPostRepository: PropertyPostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  private async getPropertyType(
    _id: string,
    i18n: I18nContext,
  ): Promise<PropertyType> {
    const propertyType = await this._propertyTypeEntityRepository.findByValue(
      _id,
      "_id",
    );

    if (!propertyType)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyTypeTranslations.NOT_FOUND)
          : this._i18n.t(PropertyTypeTranslations.NOT_FOUND),
      );

    return propertyType;
  }

  async handleAuthorization(
    type: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const postFound = await this._propertyPostRepository.findOne({
      type,
    });

    if (postFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(PropertyTypeTranslations.FORBIDDEN_DELETION)
          : this._i18n.t(PropertyTypeTranslations.FORBIDDEN_DELETION),
      );
  }

  async execute({ _id, i18n }: DeletePropertyTypeCommand): Promise<boolean> {
    const propertyTypeFound = await this.getPropertyType(_id, i18n);

    await this.handleAuthorization(propertyTypeFound.getId(), i18n);

    const propertyType =
      this.eventPublisher.mergeObjectContext(propertyTypeFound);

    const deleteCount = await this._propertyTypeEntityRepository.delete(
      _id,
      "_id",
    );

    propertyType.commit();

    return deleteCount;
  }
}
