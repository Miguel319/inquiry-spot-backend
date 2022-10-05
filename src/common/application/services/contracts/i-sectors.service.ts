import { Municipality, Sector } from "@/common/domain/entities";
import { Types } from "mongoose";
import { I18nContext } from "nestjs-i18n";

export interface ISectorsService {
  findById(_id: Types.ObjectId | string, i18n: I18nContext): Promise<Sector>;
  mapSectorToMunicipality(
    municipality: Municipality,
    sector: Sector,
    isUpdate?: boolean,
  ): Promise<void>;
  mapMunicipalityToSector(
    municipality: Municipality,
    sector: Sector,
  ): Promise<void>;
}
