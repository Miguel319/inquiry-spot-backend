import { EntityFactory } from "@/common/infrastructure/factories";
import { Municipality } from "@/common/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
// import { I18nService } from "nestjs-i18n";

@Injectable()
export class MunicipalityFactory implements EntityFactory<Municipality> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<Municipality> {
    const municipality = new Municipality({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    return municipality;
  }
}
