import { EntityFactory } from "@/common/infrastructure/factories";
import { ProvinceCreatedEvent } from "@/common/application/events";
import { Province } from "@/common/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ProvinceSchema } from "../../persistence/schemas";

@Injectable()
export class ProvinceFactory implements EntityFactory<Province> {
  constructor(
    @InjectModel(ProvinceSchema.name)
    private readonly _provinceModel: Model<ProvinceSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<Province> {
    const province = new Province({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._provinceModel.create(args[0]);

    province.apply(
      new ProvinceCreatedEvent(province.getId(), province.getName()),
    );

    return province;
  }
}
