import { MunicipalityTranslations } from "@/common/application/translations";
import { Municipality, Province } from "@/common/domain/entities";
import {
  MunicipalityEntityRepository,
  ProvinceEntityRepository,
} from "@/common/infrastructure/persistence/repositories";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { I18nContext, I18nService } from "nestjs-i18n";
import { IMunicipalitiesService } from "../../contracts";

@Injectable()
export class MunicipalitiesService implements IMunicipalitiesService {
  constructor(
    private readonly _provinceRepository: ProvinceEntityRepository,
    private readonly _municipalityRepository: MunicipalityEntityRepository,
    private readonly _i18n: I18nService,
  ) {}

  public async findById(_id: string, i18n: I18nContext): Promise<Municipality> {
    const municipality = await this._municipalityRepository.findByValue(
      _id,
      "_id",
    );

    if (!municipality)
      throw new NotFoundException(
        i18n
          ? i18n.t(MunicipalityTranslations.NOT_FOUND)
          : this._i18n.t(MunicipalityTranslations.NOT_FOUND),
      );

    return municipality;
  }

  public async mapMunicipalityToProvince(
    province: Province,
    municipality: Municipality,
    isUpdate = false,
  ): Promise<void> {
    municipality.setProvince({
      _id: new Types.ObjectId(province.getId()),
      value: province.getName(),
    });

    if (isUpdate)
      await this._municipalityRepository.findOneAndReplaceByValue(
        municipality.getId(),
        "_id",
        municipality,
      );
  }

  public async mapProvinceToMinucipality(
    province: Province,
    municipality: Municipality,
  ): Promise<void> {
    province.pushNewMunicipality(new Types.ObjectId(municipality.getId()));

    await this._provinceRepository.findOneAndReplaceByValue(
      province.getId(),
      "_id",
      province,
    );
  }
}
