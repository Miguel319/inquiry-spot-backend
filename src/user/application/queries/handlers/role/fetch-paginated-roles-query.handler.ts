import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { RoleDto } from "@/user/infrastructure/dtos";
import { RoleDtoRepository } from "@/user/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedRolesQuery } from "../..";

@QueryHandler(FetchPaginatedRolesQuery)
export class FetchPaginatedRolesQueryHandler
  implements IQueryHandler<FetchPaginatedRolesQuery>
{
  constructor(
    private readonly _roleDtoRepository: RoleDtoRepository,
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
  }: FetchPaginatedRolesQuery): Promise<PaginatedQuery<RoleDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._roleDtoRepository.getPaginated({}, queryToSend);
  }
}
