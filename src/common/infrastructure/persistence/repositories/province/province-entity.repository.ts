import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { Province } from "@/common/domain/entities";
import { ProvinceSchemaFactory } from "@/common/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProvinceSchema } from "../../schemas";

@Injectable()
export class ProvinceEntityRepository extends BaseEntityRepository<
  ProvinceSchema,
  Province
> {
  constructor(
    @InjectModel(ProvinceSchema.name) province: Model<ProvinceSchema>,
    provinceSchemaFactory: ProvinceSchemaFactory,
  ) {
    super(province, provinceSchemaFactory);
  }
}
