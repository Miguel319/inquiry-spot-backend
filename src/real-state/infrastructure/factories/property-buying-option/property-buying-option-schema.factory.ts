import { EntitySchemaFactory } from "@/common/infrastructure/persistence/factories";
import { PropertyBuyingOption } from "@/real-state/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { PropertyBuyingOptionSchema } from "../../persistence/schemas";

@Injectable()
export class PropertyBuyingOptionSchemaFactory
  implements
    EntitySchemaFactory<PropertyBuyingOptionSchema, PropertyBuyingOption>
{
  public create(
    propertyBuyingOption: PropertyBuyingOption,
  ): PropertyBuyingOptionSchema {
    return {
      _id: new Types.ObjectId(propertyBuyingOption.getId()),
      name: propertyBuyingOption.getName(),
      createdAt: propertyBuyingOption.getCreatedAt(),
      updatedAt: propertyBuyingOption.getUpdatedAt(),
    };
  }

  public createFromSchema(
    entitySchema: PropertyBuyingOptionSchema | null,
  ): PropertyBuyingOption | null {
    if (!entitySchema) return null;

    return new PropertyBuyingOption({
      ...entitySchema,
      _id: entitySchema._id.toHexString(),
    });
  }
}
