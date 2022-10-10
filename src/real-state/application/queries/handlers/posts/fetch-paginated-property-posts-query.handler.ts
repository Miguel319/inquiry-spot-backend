import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { AllPropertyPostsDto } from "@/real-state/infrastructure/dtos";
import { PropertyPostDtoRepository } from "@/real-state/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedPropertyPostsQuery } from "../..";

@QueryHandler(FetchPaginatedPropertyPostsQuery)
export class FetchPaginatedPropertyPostsQueryHandler
  implements IQueryHandler<FetchPaginatedPropertyPostsQuery>
{
  constructor(
    private readonly _propertyPostDtoRepository: PropertyPostDtoRepository,
    public readonly _i18n: I18nService,
  ) {}

  private getPaginationQueryOptions(
    paginationQuery: PaginationQuery,
    i18n: I18nContext,
  ): PaginationOptions {
    return {
      ...getPaginationOptions({ ...paginationQuery }, i18n || this._i18n),
      select:
        "_id name bedroomCount parkingLotCount price type status bathroomCount address seller buyingOption primaryImage createdAt",
    };
  }

  async execute({
    query,
    i18n,
  }: FetchPaginatedPropertyPostsQuery): Promise<
    PaginatedQuery<AllPropertyPostsDto>
  > {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._propertyPostDtoRepository.getPaginated({}, queryToSend);
  }
}
