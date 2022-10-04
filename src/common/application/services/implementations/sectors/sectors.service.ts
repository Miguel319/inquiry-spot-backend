import { SectorTranslations } from "@/common/application/translations";
import { Municipality, Sector } from "@/common/domain/entities";
import {
  SectorEntityRepository,
  MunicipalityEntityRepository,
} from "@/common/infrastructure/persistence/repositories";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { I18nContext, I18nService } from "nestjs-i18n";
import { ISectorsService } from "../../contracts";

@Injectable()
export class SectorsService implements ISectorsService {
  constructor(
    private readonly _municipalityRepository: MunicipalityEntityRepository,
    private readonly _sectorRepository: SectorEntityRepository,
    private readonly _i18n: I18nService,
  ) {}

  public async findById(_id: string, i18n: I18nContext): Promise<Sector> {
    const sector = await this._sectorRepository.findByValue(_id, "_id");

    if (!sector)
      throw new NotFoundException(
        i18n
          ? i18n.t(SectorTranslations.NOT_FOUND)
          : this._i18n.t(SectorTranslations.NOT_FOUND),
      );

    return sector;
  }

  public async mapSectorToMunicipality(
    municipality: Sector,
    sector: Sector,
    isUpdate?: boolean | undefined,
  ): Promise<void> {
    sector.setMunicipality({
      _id: new Types.ObjectId(municipality.getId()),
      value: municipality.getName(),
    });

    if (isUpdate)
      await this._sectorRepository.findOneAndReplaceByValue(
        sector.getId(),
        "_id",
        sector,
      );
  }

  public async mapMunicipalityToSector(
    municipality: Municipality,
    sector: Sector,
  ): Promise<void> {
    municipality.pushNewSector(new Types.ObjectId(sector.getId()));

    await this._municipalityRepository.findOneAndReplaceByValue(
      municipality.getId(),
      "_id",
      municipality,
    );
  }
}
