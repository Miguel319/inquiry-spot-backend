import { Municipality, Sector } from "@/common/domain/entities";
import { I18nContext } from "nestjs-i18n";

export interface ISectorsService {
  findById(_id: string, i18n: I18nContext): Promise<Sector>;
  mapSectorToMunicipality(
    municipality: Sector,
    sector: Sector,
    isUpdate?: boolean,
  ): Promise<void>;
  mapMunicipalityToSector(
    municipality: Municipality,
    sector: Sector,
  ): Promise<void>;
}
