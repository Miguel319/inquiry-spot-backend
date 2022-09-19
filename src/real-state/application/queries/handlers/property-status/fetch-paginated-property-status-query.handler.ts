import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { PropertyStatusDto } from "@/real-state/infrastructure/dtos";
import { PropertyStatusDtoRepository } from "@/real-state/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedPropertyStatusQuery } from "../..";

@QueryHandler(FetchPaginatedPropertyStatusQuery)
export class FetchPaginatedPropertyStatusQueryHandler
  implements IQueryHandler<FetchPaginatedPropertyStatusQuery>
{
  constructor(
    private readonly _propertyStatusDtoRepository: PropertyStatusDtoRepository,
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
  }: FetchPaginatedPropertyStatusQuery): Promise<PaginatedQuery<PropertyStatusDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._propertyStatusDtoRepository.getPaginated({}, queryToSend);
  }
}
