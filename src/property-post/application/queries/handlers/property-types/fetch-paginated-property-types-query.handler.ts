import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { PropertyTypeDto } from "@/property-post/infrastructure/dtos";
import { PropertyTypeDtoRepository } from "@/property-post/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedPropertyTypesQuery } from "../..";

@QueryHandler(FetchPaginatedPropertyTypesQuery)
export class FetchPaginatedPropertyTypesQueryHandler
  implements IQueryHandler<FetchPaginatedPropertyTypesQuery>
{
  constructor(
    private readonly _propertyTypeDtoRepository: PropertyTypeDtoRepository,
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
  }: FetchPaginatedPropertyTypesQuery): Promise<PaginatedQuery<PropertyTypeDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._propertyTypeDtoRepository.getPaginated({}, queryToSend);
  }
}
