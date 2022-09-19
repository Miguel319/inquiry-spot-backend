import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { VehicleStatus } from "@/vehicle/domain/entities";
import { VehicleStatusSchemaFactory } from "@/vehicle/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { VehicleStatusSchema } from "../../schemas";

@Injectable()
export class VehicleStatusEntityRepository extends BaseEntityRepository<
  VehicleStatusSchema,
  VehicleStatus
> {
  constructor(
    @InjectModel(VehicleStatusSchema.name)
    vehicleStatus: Model<VehicleStatusSchema>,
    vehicleSchemaFactory: VehicleStatusSchemaFactory,
  ) {
    super(vehicleStatus, vehicleSchemaFactory);
  }
}
