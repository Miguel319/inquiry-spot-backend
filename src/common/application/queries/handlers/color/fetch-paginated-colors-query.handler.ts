import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { ColorDto } from "@/common/infrastructure/dtos";
import { ColorDtoRepository } from "@/common/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedColorsQuery } from "../..";

@QueryHandler(FetchPaginatedColorsQuery)
export class FetchPaginatedColorsQueryHandler
  implements IQueryHandler<FetchPaginatedColorsQuery>
{
  constructor(
    private readonly _colorDtoRepository: ColorDtoRepository,
    public readonly _i18n: I18nService,
  ) {}

  private getPaginationQueryOptions(
    paginationQuery: PaginationQuery,
    i18n: I18nContext,
  ): PaginationOptions {
    return {
      ...getPaginationOptions({ ...paginationQuery }, i18n || this._i18n),
      select: "_id name hexValue createdAt updatedAt",
    };
  }

  async execute({
    query,
    i18n,
  }: FetchPaginatedColorsQuery): Promise<PaginatedQuery<ColorDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._colorDtoRepository.getPaginated(query, queryToSend);
  }
}
