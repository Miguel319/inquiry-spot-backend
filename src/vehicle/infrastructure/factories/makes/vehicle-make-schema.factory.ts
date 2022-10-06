import { EntitySchemaFactory } from "@/common/infrastructure/factories";
import { VehicleMake } from "@/vehicle/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { VehicleMakeSchema } from "../../persistence/schemas";

@Injectable()
export class VehicleMakeSchemaFactory
  implements EntitySchemaFactory<VehicleMakeSchema, VehicleMake>
{
  public create(vehicleMake: VehicleMake): VehicleMakeSchema {
    return {
      _id: new Types.ObjectId(vehicleMake.getId()),
      name: vehicleMake.getName(),
      createdAt: vehicleMake.getCreatedAt(),
      updatedAt: vehicleMake.getUpdatedAt(),
    };
  }

  public createFromSchema(
    entitySchema: VehicleMakeSchema | null,
  ): VehicleMake | null {
    if (!entitySchema) return null;

    return new VehicleMake({
      ...entitySchema,
      _id: entitySchema._id.toHexString(),
    });
  }
}
