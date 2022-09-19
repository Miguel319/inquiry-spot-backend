import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { Traction } from "@/vehicle/domain/entities";
import { TractionSchemaFactory } from "@/vehicle/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TractionSchema } from "../../schemas";

@Injectable()
export class TractionEntityRepository extends BaseEntityRepository<
  TractionSchema,
  Traction
> {
  constructor(
    @InjectModel(TractionSchema.name)
    tractionModel: Model<TractionSchema>,
    tractionSchemaFactory: TractionSchemaFactory,
  ) {
    super(tractionModel, tractionSchemaFactory);
  }
}
