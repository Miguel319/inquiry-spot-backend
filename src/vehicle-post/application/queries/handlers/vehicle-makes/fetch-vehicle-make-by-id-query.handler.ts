import { VehicleMakeTranslations } from "@/vehicle-post/application/translations";
import { VehicleMakeDto } from "@/vehicle-post/infrastructure/dtos";
import { VehicleMakeDtoRepository } from "@/vehicle-post/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchVehicleMakeByIdQuery } from "../..";

@QueryHandler(FetchVehicleMakeByIdQuery)
export class FetchVehicleMakeByIdQueryHandler
  implements IQueryHandler<FetchVehicleMakeByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _vehicleMakeDtoRepository: VehicleMakeDtoRepository,
  ) {}

  async execute({
    _id,
    i18n,
  }: FetchVehicleMakeByIdQuery): Promise<VehicleMakeDto> {
    const vehicleMake = await this._vehicleMakeDtoRepository.getById(_id);

    if (!vehicleMake)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehicleMakeTranslations.NOT_FOUND)
          : this._i18n.t(VehicleMakeTranslations.NOT_FOUND),
      );

    return vehicleMake;
  }
}
