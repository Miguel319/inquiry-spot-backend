import { SectorTranslations } from "@/common/application/translations";
import { SectorDto } from "@/common/infrastructure/dtos";
import { SectorDtoRepository } from "@/common/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchSectorByIdQuery } from "../..";

@QueryHandler(FetchSectorByIdQuery)
export class FetchSectorByIdQueryHandler
  implements IQueryHandler<FetchSectorByIdQuery>
{
  constructor(
    private readonly _i18n: I18nService,
    private readonly _sectorDtoRepository: SectorDtoRepository,
  ) {}

  async execute({ _id, i18n }: FetchSectorByIdQuery): Promise<SectorDto> {
    const sector = await this._sectorDtoRepository.getById(_id);

    if (!sector)
      throw new NotFoundException(
        i18n
          ? i18n.t(SectorTranslations.NOT_FOUND)
          : this._i18n.t(SectorTranslations.NOT_FOUND),
      );

    return sector;
  }
}
