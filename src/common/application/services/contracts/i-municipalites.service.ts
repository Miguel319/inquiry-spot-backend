import { Municipality, Province, Sector } from "@/common/domain/entities";
import { Types } from "mongoose";
import { I18nContext } from "nestjs-i18n";

export interface IMunicipalitiesService {
  findById(
    _id: Types.ObjectId | string,
    i18n: I18nContext,
  ): Promise<Municipality>;
  removeSector(sector: Sector, i18n: I18nContext): Promise<void>;
  mapMunicipalityToProvince(
    province: Province,
    municipality: Municipality,
    isUpdate?: boolean,
  ): Promise<void>;
  mapProvinceToMunicipality(
    province: Province,
    municipality: Municipality,
  ): Promise<void>;
}
