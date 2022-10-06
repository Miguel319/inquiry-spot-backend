import { VehicleStatusTranslations } from "@/vehicle/application/translations";
import { VehicleStatusDto } from "@/vehicle/infrastructure/dtos";
import { VehicleStatusDtoRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchVehicleStatusByIdQuery } from "../..";

@QueryHandler(FetchVehicleStatusByIdQuery)
export class FetchVehicleStatusByIdQueryHandler
  implements IQueryHandler<FetchVehicleStatusByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _vehicleStatusDtoRepository: VehicleStatusDtoRepository,
  ) {}

  async execute({
    _id,
    i18n,
  }: FetchVehicleStatusByIdQuery): Promise<VehicleStatusDto> {
    const vehicleStatus = await this._vehicleStatusDtoRepository.getById(_id);

    if (!vehicleStatus)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehicleStatusTranslations.NOT_FOUND)
          : this._i18n.t(VehicleStatusTranslations.NOT_FOUND),
      );

    return vehicleStatus;
  }
}
