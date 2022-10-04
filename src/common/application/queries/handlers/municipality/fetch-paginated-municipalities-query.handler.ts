import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { MunicipalityDto } from "@/common/infrastructure/dtos";
import { MunicipalityDtoRepository } from "@/common/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedMunicipalitiesQuery } from "../..";

@QueryHandler(FetchPaginatedMunicipalitiesQuery)
export class FetchPaginatedMunicipalitiesQueryHandler
  implements IQueryHandler<FetchPaginatedMunicipalitiesQuery>
{
  constructor(
    private readonly _municipalityDtoRepository: MunicipalityDtoRepository,
    public readonly _i18n: I18nService,
  ) {}

  private getPaginationQueryOptions(
    paginationQuery: PaginationQuery,
    i18n: I18nContext,
  ): PaginationOptions {
    return {
      ...getPaginationOptions({ ...paginationQuery }, i18n || this._i18n),
      select: "_id name province sectors createdAt updatedAt",
    };
  }

  async execute({
    query,
    i18n,
  }: FetchPaginatedMunicipalitiesQuery): Promise<PaginatedQuery<MunicipalityDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._municipalityDtoRepository.getPaginated(query, queryToSend);
  }
}
