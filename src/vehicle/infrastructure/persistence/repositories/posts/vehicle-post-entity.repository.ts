import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { VehiclePost } from "@/vehicle/domain/entities";
import { VehiclePostSchemaFactory } from "@/vehicle/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { VehiclePostSchema } from "../../schemas";

@Injectable()
export class VehiclePostEntityRepository extends BaseEntityRepository<
  VehiclePostSchema,
  VehiclePost
> {
  constructor(
    @InjectModel(VehiclePostSchema.name)
    vehiclePost: Model<VehiclePostSchema>,
    vehicleSchemaFactory: VehiclePostSchemaFactory,
  ) {
    super(vehiclePost, vehicleSchemaFactory);
  }
}
