import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { VehicleTypeDto } from "@/vehicle/infrastructure/dtos";
import { VehicleTypeDtoRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedVehicleTypesQuery } from "../..";

@QueryHandler(FetchPaginatedVehicleTypesQuery)
export class FetchPaginatedVehicleTypesQueryHandler
  implements IQueryHandler<FetchPaginatedVehicleTypesQuery>
{
  constructor(
    private readonly _vehicleTypeDtoRepository: VehicleTypeDtoRepository,
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
  }: FetchPaginatedVehicleTypesQuery): Promise<PaginatedQuery<VehicleTypeDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._vehicleTypeDtoRepository.getPaginated(query, queryToSend);
  }
}
