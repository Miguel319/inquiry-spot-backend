import { IBlogValuesQuery } from "@/blog/domain/types";
import { BlogDto } from "@/blog/infrastructure/dtos";
import { BlogDtoRepository } from "@/blog/infrastructure/persistence/repositories";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedBlogsQuery } from "../operations";

@QueryHandler(FetchPaginatedBlogsQuery)
export class FetchPaginatedBlogsQueryHandler
  implements IQueryHandler<FetchPaginatedBlogsQuery>
{
  constructor(
    private readonly _blogDtoRepository: BlogDtoRepository,
    private readonly _i18n: I18nService,
  ) {}

  private getPaginationOptions(
    paginationQuery: IBlogValuesQuery,
    i18n: I18nContext,
  ): PaginationOptions {
    return {
      ...getPaginationOptions({ ...paginationQuery }, i18n || this._i18n),
      select:
        "_id title body excerpt mtitle slug mdescription description photo category tags postedBy createdAt updatedAt",
      sort: "-createdAt",
    };
  }

  async execute({
    query,
    i18n,
  }: FetchPaginatedBlogsQuery): Promise<PaginatedQuery<BlogDto>> {
    const queryToSend = this.getPaginationOptions(query, i18n);

    return this._blogDtoRepository.getPaginated(query, queryToSend);
  }
}
