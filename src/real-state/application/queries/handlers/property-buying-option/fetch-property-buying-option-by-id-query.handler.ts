import { PropertyBuyingOptionTranslations } from "@/real-state/application/translations";
import { PropertyBuyingOptionDto } from "@/real-state/infrastructure/dtos";
import { PropertyBuyingOptionDtoRepository } from "@/real-state/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchPropertyBuyingOptionByIdQuery } from "../..";

@QueryHandler(FetchPropertyBuyingOptionByIdQuery)
export class FetchPropertyBuyingOptionByIdQueryHandler
  implements IQueryHandler<FetchPropertyBuyingOptionByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _propertyBuyingOptionDtoRepository: PropertyBuyingOptionDtoRepository,
  ) {}

  async execute({
    _id,
    i18n,
  }: FetchPropertyBuyingOptionByIdQuery): Promise<PropertyBuyingOptionDto> {
    const propertyBuyingOption =
      await this._propertyBuyingOptionDtoRepository.getById(_id);

    if (!propertyBuyingOption)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyBuyingOptionTranslations.NOT_FOUND)
          : this._i18n.t(PropertyBuyingOptionTranslations.NOT_FOUND),
      );

    return propertyBuyingOption;
  }
}
