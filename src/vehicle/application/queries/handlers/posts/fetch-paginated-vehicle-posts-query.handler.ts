import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { AllVehiclePostsDto } from "@/vehicle/infrastructure/dtos";
import { VehiclePostDtoRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedVehiclePostsQuery } from "../..";

@QueryHandler(FetchPaginatedVehiclePostsQuery)
export class FetchPaginatedVehiclePostsQueryHandler
  implements IQueryHandler<FetchPaginatedVehiclePostsQuery>
{
  constructor(
    private readonly _vehiclePostDtoRepository: VehiclePostDtoRepository,
    public readonly _i18n: I18nService,
  ) {}

  private getPaginationQueryOptions(
    paginationQuery: PaginationQuery,
    i18n: I18nContext,
  ): PaginationOptions {
    return {
      ...getPaginationOptions({ ...paginationQuery }, i18n || this._i18n),
      select:
        "_id make model price type year transmission fuelType use status seller primaryImage createdAt",
    };
  }

  async execute({
    query,
    i18n,
  }: FetchPaginatedVehiclePostsQuery): Promise<
    PaginatedQuery<AllVehiclePostsDto>
  > {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._vehiclePostDtoRepository.getPaginated({}, queryToSend);
  }
}
