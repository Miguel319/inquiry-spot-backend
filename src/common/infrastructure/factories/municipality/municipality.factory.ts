import { EntityFactory } from "@/common/infrastructure/factories";
import { Municipality } from "@/common/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
// import { I18nService } from "nestjs-i18n";

@Injectable()
export class MunicipalityFactory implements EntityFactory<Municipality> {
  // private readonly _provinceModel: Model<ProvinceSchema>, // private readonly _i18n: I18nService, // @InjectModel(ProvinceSchema.name) // private readonly _municipalityModel: Model<MunicipalitySchema>, // @InjectModel(MunicipalitySchema.name)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<Municipality> {
    const municipality = new Municipality({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    // await this.mapProvince(args[0].province, municipality, args[1]);

    return municipality;
  }
}
