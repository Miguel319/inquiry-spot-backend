import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { VehicleMakeDto } from "@/vehicle-post/infrastructure/dtos";
import { VehicleMakeDtoRepository } from "@/vehicle-post/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedVehicleMakesQuery } from "../..";

@QueryHandler(FetchPaginatedVehicleMakesQuery)
export class FetchPaginatedVehicleMakesQueryHandler
  implements IQueryHandler<FetchPaginatedVehicleMakesQuery>
{
  constructor(
    private readonly _vehicleMakeDtoRepository: VehicleMakeDtoRepository,
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
  }: FetchPaginatedVehicleMakesQuery): Promise<PaginatedQuery<VehicleMakeDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._vehicleMakeDtoRepository.getPaginated({}, queryToSend);
  }
}
