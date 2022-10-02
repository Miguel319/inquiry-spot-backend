import { EntitySchemaFactory } from "@/common/infrastructure/factories";
import { PropertyStatus } from "@/real-state/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { PropertyStatusSchema } from "../../persistence/schemas";

@Injectable()
export class PropertyStatusSchemaFactory
  implements EntitySchemaFactory<PropertyStatusSchema, PropertyStatus>
{
  public create(propertyStatus: PropertyStatus): PropertyStatusSchema {
    return {
      _id: new Types.ObjectId(propertyStatus.getId()),
      name: propertyStatus.getName(),
      createdAt: propertyStatus.getCreatedAt(),
      updatedAt: propertyStatus.getUpdatedAt(),
    };
  }

  public createFromSchema(
    entitySchema: PropertyStatusSchema | null,
  ): PropertyStatus | null {
    if (!entitySchema) return null;

    return new PropertyStatus({
      ...entitySchema,
      _id: entitySchema._id.toHexString(),
    });
  }
}
