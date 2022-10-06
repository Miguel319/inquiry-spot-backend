import { PaginationQuery } from "@/common/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { VehiclePostDto } from "@/vehicle/infrastructure/dtos";
import { VehiclePostDtoRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { FetchVehiclePostsFromSellerQuery } from "../..";

@QueryHandler(FetchVehiclePostsFromSellerQuery)
export class FetchVehiclePostsFromSellerQueryHandler
  implements IQueryHandler<FetchVehiclePostsFromSellerQuery>
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
        "_id make model price type year transmission use status seller primaryImage createdAt",
    };
  }

  async execute({
    query,
    i18n,
    seller,
  }: FetchVehiclePostsFromSellerQuery): Promise<PaginatedQuery<VehiclePostDto> | null> {
    const queryToSend = this.getPaginationQueryOptions(query, i18n);

    return this._vehiclePostDtoRepository.getPaginated(
      { "seller._id": seller },
      queryToSend,
    );
  }
}
