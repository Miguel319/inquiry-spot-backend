import { MunicipalityTranslations } from "@/common/application/translations";
import { MunicipalityDto } from "@/common/infrastructure/dtos";
import { MunicipalityDtoRepository } from "@/common/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchMunicipalityByIdQuery } from "../..";

@QueryHandler(FetchMunicipalityByIdQuery)
export class FetchMunicipalityByIdQueryHandler
  implements IQueryHandler<FetchMunicipalityByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _municipalityDtoRepository: MunicipalityDtoRepository,
  ) {}

  async execute({
    _id,
    i18n,
  }: FetchMunicipalityByIdQuery): Promise<MunicipalityDto> {
    const municipality = await this._municipalityDtoRepository.getById(_id);

    if (!municipality)
      throw new NotFoundException(
        i18n
          ? i18n.t(MunicipalityTranslations.NOT_FOUND)
          : this._i18n.t(MunicipalityTranslations.NOT_FOUND),
      );

    return municipality;
  }
}
