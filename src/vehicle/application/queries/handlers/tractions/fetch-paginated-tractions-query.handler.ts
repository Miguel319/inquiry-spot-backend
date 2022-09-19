import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { TractionDto } from "@/vehicle/infrastructure/dtos";
import { TractionDtoRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedTractionsQuery } from "../..";

@QueryHandler(FetchPaginatedTractionsQuery)
export class FetchPaginatedTractionsQueryHandler
  implements IQueryHandler<FetchPaginatedTractionsQuery>
{
  constructor(
    private readonly _tractionDtoRepository: TractionDtoRepository,
    public readonly _i18n: I18nService,
  ) {}

  private getPaginationQueryOptions(
    paginationQuery: PaginationQuery,
    i18n: I18nContext,
  ): PaginationOptions {
    return {
      ...getPaginationOptions({ ...paginationQuery }, i18n || this._i18n),
      select: "_id name createdAt updatedAt",
    };
  }

  async execute({
    query,
    i18n,
  }: FetchPaginatedTractionsQuery): Promise<PaginatedQuery<TractionDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._tractionDtoRepository.getPaginated({}, queryToSend);
  }
}
