import { AllVehiclePostsDto } from "@/vehicle/infrastructure/dtos";
import { VehiclePostDtoRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchLastFiveVehiclePostsQuery } from "../..";

@QueryHandler(FetchLastFiveVehiclePostsQuery)
export class FetchLastFiveVehiclePostsQueryHandler
  implements IQueryHandler<FetchLastFiveVehiclePostsQuery>
{
  constructor(
    private readonly _vehiclePostDtoRepository: VehiclePostDtoRepository,
    public readonly _i18n: I18nService,
  ) {}

  async execute(): Promise<AllVehiclePostsDto[]> {
    return this._vehiclePostDtoRepository.getAll(5);
  }
}
