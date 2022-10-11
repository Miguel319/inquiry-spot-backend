import { PropertyBuyingOptionTranslations } from "@/real-state/application/translations";
import { PropertyBuyingOption } from "@/real-state/domain/entities";
import { IPropertyBuyingOption } from "@/real-state/domain/types";
import { UpdatePropertyBuyingOptionDto } from "@/real-state/infrastructure/dtos";
import { PropertyBuyingOptionEntityRepository } from "@/real-state/infrastructure/persistence/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdatePropertyBuyingOptionCommand } from "../..";

@CommandHandler(UpdatePropertyBuyingOptionCommand)
export class UpdatePropertyBuyingOptionCommandHandler
  implements ICommandHandler<UpdatePropertyBuyingOptionCommand>
{
  constructor(
    private readonly _propertyBuyingOptionRepository: PropertyBuyingOptionEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getPropertyBuyingOption(
    _id: string,
    i18n: I18nContext,
  ): Promise<PropertyBuyingOption> {
    const propertyBuyingOption =
      await this._propertyBuyingOptionRepository.findByValue(_id, "_id");

    if (!propertyBuyingOption)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyBuyingOptionTranslations.NOT_FOUND)
          : this._i18n.t(PropertyBuyingOptionTranslations.NOT_FOUND),
      );

    return propertyBuyingOption;
  }

  private async checkDuplicates(
    propertyBuyingOption: PropertyBuyingOption,
    updatePropertyBuyingOptionDto: UpdatePropertyBuyingOptionDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound =
      await this._propertyBuyingOptionRepository.findOneEntity({
        $or: [
          { "name.es": updatePropertyBuyingOptionDto.name.es },
          { "name.en": updatePropertyBuyingOptionDto.name.en },
        ],
      });

    const exists =
      entityFound && entityFound.getId() !== propertyBuyingOption.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(PropertyBuyingOptionTranslations.NAME_DUPLICATE)
          : this._i18n.t(PropertyBuyingOptionTranslations.NAME_DUPLICATE),
      );
  }

  async execute({
    _id,
    updatePropertyBuyingOptionDto,
    i18n,
  }: UpdatePropertyBuyingOptionCommand): Promise<void> {
    const propertyBuyingOptionFound = await this.getPropertyBuyingOption(
      _id,
      i18n,
    );

    await this.checkDuplicates(
      propertyBuyingOptionFound,
      updatePropertyBuyingOptionDto,
      i18n,
    );

    const propertyBuyingOption = this.eventPublisher.mergeObjectContext(
      propertyBuyingOptionFound,
    );

    propertyBuyingOption.updatePropertyBuyingOption(
      updatePropertyBuyingOptionDto as unknown as IPropertyBuyingOption,
    );

    await this._propertyBuyingOptionRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      propertyBuyingOption,
    );

    propertyBuyingOption.commit();
  }
}
