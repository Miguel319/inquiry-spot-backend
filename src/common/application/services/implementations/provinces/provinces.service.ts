import { ProvinceTranslations } from "@/common/application/translations";
import { Municipality, Province } from "@/common/domain/entities";
import { ProvinceEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { I18nContext, I18nService } from "nestjs-i18n";
import { IProvincesService } from "../../contracts";

@Injectable()
export class ProvincesService implements IProvincesService {
  constructor(
    private readonly _provinceRepository: ProvinceEntityRepository,
    private readonly _i18n: I18nService,
  ) {}

  public async findById(
    _id: Types.ObjectId | string,
    i18n: I18nContext,
  ): Promise<Province> {
    const province = await this._provinceRepository.findByValue(_id, "_id");

    if (!province)
      throw new NotFoundException(
        i18n
          ? i18n.t(ProvinceTranslations.NOT_FOUND)
          : this._i18n.t(ProvinceTranslations.NOT_FOUND),
      );

    return province;
  }

  public async removeMunicipality(
    municipality: Municipality,
    i18n: I18nContext,
  ): Promise<void> {
    const province = await this.findById(municipality.getProvince()._id, i18n);

    province.removeMunicipality(new Types.ObjectId(municipality.getId()));

    await this._provinceRepository.findOneAndReplaceByValue(
      province.getId(),
      "_id",
      province,
    );
  }
}
