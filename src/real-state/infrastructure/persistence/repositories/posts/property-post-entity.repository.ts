import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { PropertyPost } from "@/real-state/domain/entities";
import { PropertyPostSchemaFactory } from "@/real-state/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PropertyPostSchema } from "../../schemas";

@Injectable()
export class PropertyPostEntityRepository extends BaseEntityRepository<
  PropertyPostSchema,
  PropertyPost
> {
  constructor(
    @InjectModel(PropertyPostSchema.name)
    vehiclePost: Model<PropertyPostSchema>,
    vehicleSchemaFactory: PropertyPostSchemaFactory,
  ) {
    super(vehiclePost, vehicleSchemaFactory);
  }
}
