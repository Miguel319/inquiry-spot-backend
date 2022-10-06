import { VehiclePostTranslations } from "@/vehicle/application/translations";
import { VehiclePostDto } from "@/vehicle/infrastructure/dtos";
import { VehiclePostDtoRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchVehiclePostByIdQuery } from "../..";

@QueryHandler(FetchVehiclePostByIdQuery)
export class FetchVehiclePostByIdQueryHandler
  implements IQueryHandler<FetchVehiclePostByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _vehiclePostDtoRepository: VehiclePostDtoRepository,
  ) {}

  async execute({
    _id,
    i18n,
  }: FetchVehiclePostByIdQuery): Promise<VehiclePostDto> {
    const vehiclePost = await this._vehiclePostDtoRepository.getById(_id);

    if (!vehiclePost)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehiclePostTranslations.NOT_FOUND)
          : this._i18n.t(VehiclePostTranslations.NOT_FOUND),
      );

    return vehiclePost;
  }
}
