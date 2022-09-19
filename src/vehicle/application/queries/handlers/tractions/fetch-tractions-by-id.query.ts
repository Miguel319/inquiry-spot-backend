import { TractionTranslations } from "@/vehicle/application/translations";
import { TractionDto } from "@/vehicle/infrastructure/dtos";
import { TractionDtoRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchTractionByIdQuery } from "../..";

@QueryHandler(FetchTractionByIdQuery)
export class FetchTractionByIdQueryHandler
  implements IQueryHandler<FetchTractionByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _tractionDtoRepository: TractionDtoRepository,
  ) {}

  async execute({ _id, i18n }: FetchTractionByIdQuery): Promise<TractionDto> {
    const traction = await this._tractionDtoRepository.getById(_id);

    if (!traction)
      throw new NotFoundException(
        i18n
          ? i18n.t(TractionTranslations.NOT_FOUND)
          : this._i18n.t(TractionTranslations.NOT_FOUND),
      );

    return traction;
  }
}
