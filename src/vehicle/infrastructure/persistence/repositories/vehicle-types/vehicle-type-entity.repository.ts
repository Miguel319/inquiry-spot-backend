import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { VehicleType } from "@/vehicle/domain/entities";
import { VehicleTypeSchemaFactory } from "@/vehicle/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { VehicleTypeSchema } from "../../schemas";

@Injectable()
export class VehicleTypeEntityRepository extends BaseEntityRepository<
  VehicleTypeSchema,
  VehicleType
> {
  constructor(
    @InjectModel(VehicleTypeSchema.name) vehicleType: Model<VehicleTypeSchema>,
    vehicleSchemaFactory: VehicleTypeSchemaFactory,
  ) {
    super(vehicleType, vehicleSchemaFactory);
  }
}
