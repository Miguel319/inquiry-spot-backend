import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { Fuel } from "@/vehicle/domain/entities";
import { FuelSchemaFactory } from "@/vehicle/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FuelSchema } from "../../schemas";

@Injectable()
export class FuelEntityRepository extends BaseEntityRepository<
  FuelSchema,
  Fuel
> {
  constructor(
    @InjectModel(FuelSchema.name)
    fuelModel: Model<FuelSchema>,
    fuelSchemaFactory: FuelSchemaFactory,
  ) {
    super(fuelModel, fuelSchemaFactory);
  }
}
