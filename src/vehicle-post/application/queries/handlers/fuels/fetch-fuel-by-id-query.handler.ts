import { FuelTranslations } from "@/vehicle-post/application/translations";
import { FuelDto } from "@/vehicle-post/infrastructure/dtos";
import { FuelDtoRepository } from "@/vehicle-post/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchFuelByIdQuery } from "../..";

@QueryHandler(FetchFuelByIdQuery)
export class FetchFuelByIdQueryHandler
  implements IQueryHandler<FetchFuelByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _fuelDtoRepository: FuelDtoRepository,
  ) {}

  async execute({ _id, i18n }: FetchFuelByIdQuery): Promise<FuelDto> {
    const fuel = await this._fuelDtoRepository.getById(_id);

    if (!fuel)
      throw new NotFoundException(
        i18n
          ? i18n.t(FuelTranslations.NOT_FOUND)
          : this._i18n.t(FuelTranslations.NOT_FOUND),
      );

    return fuel;
  }
}
