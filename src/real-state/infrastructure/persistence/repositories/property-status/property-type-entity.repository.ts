import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { PropertyStatus } from "@/real-state/domain/entities";
import { PropertyStatusSchemaFactory } from "@/real-state/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PropertyStatusSchema } from "../../schemas";

@Injectable()
export class PropertyStatusEntityRepository extends BaseEntityRepository<
  PropertyStatusSchema,
  PropertyStatus
> {
  constructor(
    @InjectModel(PropertyStatusSchema.name)
    propertyType: Model<PropertyStatusSchema>,
    propertySchemaFactory: PropertyStatusSchemaFactory,
  ) {
    super(propertyType, propertySchemaFactory);
  }
}
