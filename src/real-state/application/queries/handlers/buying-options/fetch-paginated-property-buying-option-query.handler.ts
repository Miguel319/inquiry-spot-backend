import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { PropertyBuyingOptionDto } from "@/real-state/infrastructure/dtos";
import { PropertyBuyingOptionDtoRepository } from "@/real-state/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedPropertyBuyingOptionQuery } from "../..";

@QueryHandler(FetchPaginatedPropertyBuyingOptionQuery)
export class FetchPaginatedPropertyBuyingOptionQueryHandler
  implements IQueryHandler<FetchPaginatedPropertyBuyingOptionQuery>
{
  constructor(
    private readonly _propertyBuyingOptionDtoRepository: PropertyBuyingOptionDtoRepository,
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
  }: FetchPaginatedPropertyBuyingOptionQuery): Promise<PaginatedQuery<PropertyBuyingOptionDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._propertyBuyingOptionDtoRepository.getPaginated(
      {},
      queryToSend,
    );
  }
}
