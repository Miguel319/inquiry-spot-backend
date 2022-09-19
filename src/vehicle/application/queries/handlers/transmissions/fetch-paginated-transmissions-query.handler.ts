import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { TransmissionDto } from "@/vehicle/infrastructure/dtos";
import { TransmissionDtoRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedTransmissionsQuery } from "../..";

@QueryHandler(FetchPaginatedTransmissionsQuery)
export class FetchPaginatedTransmissionsQueryHandler
  implements IQueryHandler<FetchPaginatedTransmissionsQuery>
{
  constructor(
    private readonly _transmissionDtoRepository: TransmissionDtoRepository,
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
  }: FetchPaginatedTransmissionsQuery): Promise<PaginatedQuery<TransmissionDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._transmissionDtoRepository.getPaginated({}, queryToSend);
  }
}
