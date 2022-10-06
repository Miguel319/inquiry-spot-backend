import { Municipality, Province } from "@/common/domain/entities";
import { Types } from "mongoose";
import { I18nContext } from "nestjs-i18n";

export interface IProvincesService {
  findById(_id: Types.ObjectId | string, i18n: I18nContext): Promise<Province>;
  removeMunicipality(
    municipality: Municipality,
    i18n: I18nContext,
  ): Promise<void>;
}
