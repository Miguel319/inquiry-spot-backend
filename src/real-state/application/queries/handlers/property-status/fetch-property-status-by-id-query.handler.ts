import { PropertyStatusTranslations } from "@/real-state/application/translations";
import { PropertyStatusDto } from "@/real-state/infrastructure/dtos";
import { PropertyStatusDtoRepository } from "@/real-state/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchPropertyStatusByIdQuery } from "../..";

@QueryHandler(FetchPropertyStatusByIdQuery)
export class FetchPropertyStatusByIdQueryHandler
  implements IQueryHandler<FetchPropertyStatusByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _propertyStatusDtoRepository: PropertyStatusDtoRepository,
  ) {}

  async execute({
    _id,
    i18n,
  }: FetchPropertyStatusByIdQuery): Promise<PropertyStatusDto> {
    const propertyStatus = await this._propertyStatusDtoRepository.getById(_id);

    if (!propertyStatus)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyStatusTranslations.NOT_FOUND)
          : this._i18n.t(PropertyStatusTranslations.NOT_FOUND),
      );

    return propertyStatus;
  }
}
