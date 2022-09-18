import { EntitySchemaFactory } from "@/common/infrastructure/persistence/factories";
import { Fuel } from "@/vehicle-post/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { FuelSchema } from "../../persistence/schemas";

@Injectable()
export class FuelSchemaFactory
  implements EntitySchemaFactory<FuelSchema, Fuel>
{
  public create(fuel: Fuel): FuelSchema {
    return {
      _id: new Types.ObjectId(fuel.getId()),
      name: fuel.getName(),
      createdAt: fuel.getCreatedAt(),
      updatedAt: fuel.getUpdatedAt(),
    };
  }

  public createFromSchema(entitySchema: FuelSchema | null): Fuel | null {
    if (!entitySchema) return null;

    return new Fuel({
      ...entitySchema,
      _id: entitySchema._id.toHexString(),
    });
  }
}
