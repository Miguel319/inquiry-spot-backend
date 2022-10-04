import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { ProvinceDto } from "@/common/infrastructure/dtos";
import { ProvinceDtoRepository } from "@/common/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedProvincesQuery } from "../..";

@QueryHandler(FetchPaginatedProvincesQuery)
export class FetchPaginatedProvincesQueryHandler
  implements IQueryHandler<FetchPaginatedProvincesQuery>
{
  constructor(
    private readonly _provinceDtoRepository: ProvinceDtoRepository,
    public readonly _i18n: I18nService,
  ) {}

  private getPaginationQueryOptions(
    paginationQuery: PaginationQuery,
    i18n: I18nContext,
  ): PaginationOptions {
    return {
      ...getPaginationOptions({ ...paginationQuery }, i18n || this._i18n),
      select: "_id name municipalities createdAt updatedAt",
    };
  }

  async execute({
    query,
    i18n,
  }: FetchPaginatedProvincesQuery): Promise<PaginatedQuery<ProvinceDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._provinceDtoRepository.getPaginated(query, queryToSend);
  }
}
