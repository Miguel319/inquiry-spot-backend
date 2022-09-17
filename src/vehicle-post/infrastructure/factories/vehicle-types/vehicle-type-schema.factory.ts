import { EntitySchemaFactory } from "@/common/infrastructure/persistence/factories";
import { VehicleType } from "@/vehicle-post/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { VehicleTypeSchema } from "../../persistence/schemas";

@Injectable()
export class VehicleTypeSchemaFactory
  implements EntitySchemaFactory<VehicleTypeSchema, VehicleType>
{
  public create(vehicleType: VehicleType): VehicleTypeSchema {
    return {
      _id: new Types.ObjectId(vehicleType.getId()),
      name: vehicleType.getName(),
      createdAt: vehicleType.getCreatedAt(),
      updatedAt: vehicleType.getUpdatedAt(),
    };
  }

  public createFromSchema(
    vehicleTypeSchema: VehicleTypeSchema | null,
  ): VehicleType | null {
    if (!vehicleTypeSchema) return null;

    return new VehicleType({
      ...vehicleTypeSchema,
      _id: vehicleTypeSchema._id.toHexString(),
    });
  }
}
