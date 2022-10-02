import {
  EntityFactory,
  MunicipalitySchemaFactory,
} from "@/common/infrastructure/factories";
import { MunicipalityCreatedEvent } from "@/common/application/events";
import { Municipality } from "@/common/domain/entities";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { MunicipalitySchema, ProvinceSchema } from "../../persistence/schemas";
import { ProvinceTranslations } from "@/common/application/translations";
import { I18nContext } from "nestjs-i18n";

@Injectable()
export class MunicipalityFactory implements EntityFactory<Municipality> {
  constructor(
    @InjectModel(MunicipalitySchema.name)
    private readonly _municipalityModel: Model<MunicipalitySchema>,
    @InjectModel(ProvinceSchema.name)
    private readonly _provinceModel: Model<ProvinceSchema>,
    private readonly _i18n: I18nContext,
    private readonly _municipalitySchemaFactory: MunicipalitySchemaFactory,
  ) {}

  async mapProvince(
    provinceId: string,
    municipality: Municipality,
    i18n: I18nContext,
  ): Promise<void> {
    const province = await this._provinceModel.findOne({ _id: provinceId });

    if (!province)
      throw new NotFoundException(
        i18n
          ? i18n.t(ProvinceTranslations.NOT_FOUND)
          : this._i18n.t(ProvinceTranslations.NOT_FOUND),
      );

    municipality.setProvince({ _id: province._id, value: province.name });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<Municipality> {
    const municipality = new Municipality({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this.mapProvince(args[0]._id, municipality, args[1]);

    const municipalitySchema =
      this._municipalitySchemaFactory.create(municipality);

    await this._municipalityModel.create(municipalitySchema);

    municipality.apply(
      new MunicipalityCreatedEvent(
        municipality.getId(),
        municipality.getName(),
      ),
    );

    return municipality;
  }
}
