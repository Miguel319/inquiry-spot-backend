import { EntitySchemaFactory } from "@/common/infrastructure/persistence/factories";
import { PropertyType } from "@/real-state/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { PropertyTypeSchema } from "../../persistence/schemas";

@Injectable()
export class PropertyTypeSchemaFactory
  implements EntitySchemaFactory<PropertyTypeSchema, PropertyType>
{
  public create(propertyType: PropertyType): PropertyTypeSchema {
    return {
      _id: new Types.ObjectId(propertyType.getId()),
      name: propertyType.getName(),
      createdAt: propertyType.getCreatedAt(),
      updatedAt: propertyType.getUpdatedAt(),
    };
  }

  public createFromSchema(
    entitySchema: PropertyTypeSchema | null,
  ): PropertyType | null {
    if (!entitySchema) return null;

    return new PropertyType({
      ...entitySchema,
      _id: entitySchema._id.toHexString(),
    });
  }
}
