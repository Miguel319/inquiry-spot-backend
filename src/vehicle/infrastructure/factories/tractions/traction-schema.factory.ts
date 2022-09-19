import { EntitySchemaFactory } from "@/common/infrastructure/persistence/factories";
import { Traction } from "@/vehicle/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { TractionSchema } from "../../persistence/schemas";

@Injectable()
export class TractionSchemaFactory
  implements EntitySchemaFactory<TractionSchema, Traction>
{
  public create(traction: Traction): TractionSchema {
    return {
      _id: new Types.ObjectId(traction.getId()),
      name: traction.getName(),
      createdAt: traction.getCreatedAt(),
      updatedAt: traction.getUpdatedAt(),
    };
  }

  public createFromSchema(
    entitySchema: TractionSchema | null,
  ): Traction | null {
    if (!entitySchema) return null;

    return new Traction({
      ...entitySchema,
      _id: entitySchema._id.toHexString(),
    });
  }
}
