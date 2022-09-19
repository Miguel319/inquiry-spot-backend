import { PropertyBuyingOptionTranslations } from "@/real-state/application/translations";
import { PropertyBuyingOption } from "@/real-state/domain/entities";
import {
  PropertyPostsRepository,
  PropertyBuyingOptionEntityRepository,
} from "@/real-state/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeletePropertyBuyingOptionCommand } from "../..";

@CommandHandler(DeletePropertyBuyingOptionCommand)
export class DeletePropertyBuyingOptionCommandHandler
  implements ICommandHandler<DeletePropertyBuyingOptionCommand>
{
  constructor(
    private readonly _propertyBuyingOptionEntityRepository: PropertyBuyingOptionEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _propertyPostRepository: PropertyPostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  private async getPropertyBuyingOption(
    _id: string,
    i18n: I18nContext,
  ): Promise<PropertyBuyingOption> {
    const propertyBuyingOption =
      await this._propertyBuyingOptionEntityRepository.findByValue(_id, "_id");

    if (!propertyBuyingOption)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyBuyingOptionTranslations.NOT_FOUND)
          : this._i18n.t(PropertyBuyingOptionTranslations.NOT_FOUND),
      );

    return propertyBuyingOption;
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
          ? i18n.t(PropertyBuyingOptionTranslations.FORBIDDEN_DELETION)
          : this._i18n.t(PropertyBuyingOptionTranslations.FORBIDDEN_DELETION),
      );
  }

  async execute({
    _id,
    i18n,
  }: DeletePropertyBuyingOptionCommand): Promise<boolean> {
    const propertyBuyingOptionFound = await this.getPropertyBuyingOption(
      _id,
      i18n,
    );

    await this.handleAuthorization(propertyBuyingOptionFound.getId(), i18n);

    const propertyBuyingOption = this.eventPublisher.mergeObjectContext(
      propertyBuyingOptionFound,
    );

    const deleteCount = await this._propertyBuyingOptionEntityRepository.delete(
      _id,
      "_id",
    );

    propertyBuyingOption.commit();

    return deleteCount;
  }
}
