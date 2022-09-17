import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { VehicleMake } from "@/vehicle-post/domain/entities";
import { VehicleMakeSchemaFactory } from "@/vehicle-post/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { VehicleMakeSchema } from "../../schemas";

@Injectable()
export class VehicleMakesEntityRepository extends BaseEntityRepository<
  VehicleMakeSchema,
  VehicleMake
> {
  constructor(
    @InjectModel(VehicleMakeSchema.name)
    vehicleMakeModel: Model<VehicleMakeSchema>,
    vehicleMakeSchemaFactory: VehicleMakeSchemaFactory,
  ) {
    super(vehicleMakeModel, vehicleMakeSchemaFactory);
  }
}
