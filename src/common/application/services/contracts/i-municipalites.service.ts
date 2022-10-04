import { Municipality, Province } from "@/common/domain/entities";
import { I18nContext } from "nestjs-i18n";

export interface IMunicipalitiesService {
  findById(_id: string, i18n: I18nContext): Promise<Municipality>;
  mapMunicipalityToProvince(
    province: Province,
    municipality: Municipality,
    isUpdate?: boolean,
  ): Promise<void>;
  mapProvinceToMinucipality(
    province: Province,
    municipality: Municipality,
  ): Promise<void>;
}
