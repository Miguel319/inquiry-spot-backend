import { VehicleTypeTranslations } from "@/vehicle-post/application/translations";
import { VehicleTypeDto } from "@/vehicle-post/infrastructure/dtos";
import { VehicleTypeDtoRepository } from "@/vehicle-post/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchVehicleTypeByIdQuery } from "../..";

@QueryHandler(FetchVehicleTypeByIdQuery)
export class FetchVehicleTypeByIdQueryHandler
  implements IQueryHandler<FetchVehicleTypeByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _vehicleTypeDtoRepository: VehicleTypeDtoRepository,
  ) {}

  async execute({
    _id,
    i18n,
  }: FetchVehicleTypeByIdQuery): Promise<VehicleTypeDto | null> {
    const vehicleType = await this._vehicleTypeDtoRepository.getById(_id);

    if (!vehicleType)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehicleTypeTranslations.NOT_FOUND)
          : this._i18n.t(VehicleTypeTranslations.NOT_FOUND),
      );

    return null;
  }
}
