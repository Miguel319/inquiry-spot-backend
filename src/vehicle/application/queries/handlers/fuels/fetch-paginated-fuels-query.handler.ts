import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { FuelDto } from "@/vehicle/infrastructure/dtos";
import { FuelDtoRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedFuelsQuery } from "../..";

@QueryHandler(FetchPaginatedFuelsQuery)
export class FetchPaginatedFuelsQueryHandler
  implements IQueryHandler<FetchPaginatedFuelsQuery>
{
  constructor(
    private readonly _fuelDtoRepository: FuelDtoRepository,
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
  }: FetchPaginatedFuelsQuery): Promise<PaginatedQuery<FuelDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._fuelDtoRepository.getPaginated({}, queryToSend);
  }
}
