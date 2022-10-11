import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { PropertyBuyingOption } from "@/real-state/domain/entities";
import { PropertyBuyingOptionSchemaFactory } from "@/real-state/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PropertyBuyingOptionSchema } from "../../schemas";

@Injectable()
export class PropertyBuyingOptionEntityRepository extends BaseEntityRepository<
  PropertyBuyingOptionSchema,
  PropertyBuyingOption
> {
  constructor(
    @InjectModel(PropertyBuyingOptionSchema.name)
    propertyType: Model<PropertyBuyingOptionSchema>,
    propertySchemaFactory: PropertyBuyingOptionSchemaFactory,
  ) {
    super(propertyType, propertySchemaFactory);
  }
}
