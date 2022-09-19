import { PropertyTypeTranslations } from "@/property/application/translations";
import { PropertyTypeDto } from "@/property/infrastructure/dtos";
import { PropertyTypeDtoRepository } from "@/property/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchPropertyTypeByIdQuery } from "../..";

@QueryHandler(FetchPropertyTypeByIdQuery)
export class FetchPropertyTypeByIdQueryHandler
  implements IQueryHandler<FetchPropertyTypeByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _propertyTypeDtoRepository: PropertyTypeDtoRepository,
  ) {}

  async execute({
    _id,
    i18n,
  }: FetchPropertyTypeByIdQuery): Promise<PropertyTypeDto> {
    const propertyType = await this._propertyTypeDtoRepository.getById(_id);

    if (!propertyType)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyTypeTranslations.NOT_FOUND)
          : this._i18n.t(PropertyTypeTranslations.NOT_FOUND),
      );

    return propertyType;
  }
}
