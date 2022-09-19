import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { PropertyType } from "@/property-post/domain/entities";
import { PropertyTypeSchemaFactory } from "@/property-post/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PropertyTypeSchema } from "../../schemas";

@Injectable()
export class PropertyTypeEntityRepository extends BaseEntityRepository<
  PropertyTypeSchema,
  PropertyType
> {
  constructor(
    @InjectModel(PropertyTypeSchema.name)
    propertyType: Model<PropertyTypeSchema>,
    propertySchemaFactory: PropertyTypeSchemaFactory,
  ) {
    super(propertyType, propertySchemaFactory);
  }
}
