import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { VehicleStatusDto } from "@/vehicle/infrastructure/dtos";
import { VehicleStatusDtoRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchPaginatedVehicleStatusQuery } from "../..";

@QueryHandler(FetchPaginatedVehicleStatusQuery)
export class FetchPaginatedVehicleStatusQueryHandler
  implements IQueryHandler<FetchPaginatedVehicleStatusQuery>
{
  constructor(
    private readonly _vehicleStatusDtoRepository: VehicleStatusDtoRepository,
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
  }: FetchPaginatedVehicleStatusQuery): Promise<PaginatedQuery<VehicleStatusDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._vehicleStatusDtoRepository.getPaginated({}, queryToSend);
  }
}
