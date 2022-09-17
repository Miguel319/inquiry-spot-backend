import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { VehicleType } from "@/vehicle-post/domain/entities";
import { VehicleTypeSchemaFactory } from "@/vehicle-post/infrastructure/factories";
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
    @InjectModel(VehicleTypeSchema.name) blog: Model<VehicleTypeSchema>,
    blogSchemaFactory: VehicleTypeSchemaFactory,
  ) {
    super(blog, blogSchemaFactory);
  }
}
