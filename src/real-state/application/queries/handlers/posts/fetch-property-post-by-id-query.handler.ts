import { PropertyPostsTranslations } from "@/real-state/application/translations";
import { PropertyPostDto } from "@/real-state/infrastructure/dtos";
import { PropertyPostDtoRepository } from "@/real-state/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchPropertyPostByIdQuery } from "../..";

@QueryHandler(FetchPropertyPostByIdQuery)
export class FetchPropertyPostByIdQueryHandler
  implements IQueryHandler<FetchPropertyPostByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _propertyStatusDtoRepository: PropertyPostDtoRepository,
  ) {}

  async execute({
    _id,
    i18n,
  }: FetchPropertyPostByIdQuery): Promise<PropertyPostDto> {
    const propertyStatus = await this._propertyStatusDtoRepository.getById(_id);

    if (!propertyStatus)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyPostsTranslations.NOT_FOUND)
          : this._i18n.t(PropertyPostsTranslations.NOT_FOUND),
      );

    return propertyStatus;
  }
}
