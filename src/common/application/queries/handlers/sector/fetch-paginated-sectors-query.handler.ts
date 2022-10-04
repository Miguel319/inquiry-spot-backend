import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { SectorDto } from "@/common/infrastructure/dtos";
import { SectorDtoRepository } from "@/common/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedSectorsQuery } from "../..";

@QueryHandler(FetchPaginatedSectorsQuery)
export class FetchPaginatedSectorsQueryHandler
  implements IQueryHandler<FetchPaginatedSectorsQuery>
{
  constructor(
    private readonly _sectorDtoRepository: SectorDtoRepository,
    public readonly _i18n: I18nService,
  ) {}

  private getPaginationQueryOptions(
    paginationQuery: PaginationQuery,
    i18n: I18nContext,
  ): PaginationOptions {
    return {
      ...getPaginationOptions({ ...paginationQuery }, i18n || this._i18n),
      select: "_id name sector createdAt updatedAt",
    };
  }

  async execute({
    query,
    i18n,
  }: FetchPaginatedSectorsQuery): Promise<PaginatedQuery<SectorDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._sectorDtoRepository.getPaginated(query, queryToSend);
  }
}
