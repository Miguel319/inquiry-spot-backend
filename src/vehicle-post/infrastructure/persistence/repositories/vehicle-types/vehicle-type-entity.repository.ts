import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { VehicleType } from "@/vehicle-post/domain/entities";
import { VehicleTypeSchemaFactory } from "@/vehicle-post/infrastructure/factories";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { VehicleTypeSchema } from "../../schemas";

export class VehicleTypeEntityRepository extends BaseEntityRepository<
  VehicleTypeSchema,
  VehicleType
> {
  constructor(
    @InjectModel(VehicleType.name) vehicleType: Model<VehicleTypeSchema>,
    vehicleTypeSchemaFactory: VehicleTypeSchemaFactory,
  ) {
    super(vehicleType, vehicleTypeSchemaFactory);
  }
}
