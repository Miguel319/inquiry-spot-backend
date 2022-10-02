import { EntitySchemaFactory } from "@/common/infrastructure/factories";
import { VehicleStatus } from "@/vehicle/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { VehicleStatusSchema } from "../../persistence/schemas";

@Injectable()
export class VehicleStatusSchemaFactory
  implements EntitySchemaFactory<VehicleStatusSchema, VehicleStatus>
{
  public create(vehicleStatus: VehicleStatus): VehicleStatusSchema {
    return {
      _id: new Types.ObjectId(vehicleStatus.getId()),
      name: vehicleStatus.getName(),
      createdAt: vehicleStatus.getCreatedAt(),
      updatedAt: vehicleStatus.getUpdatedAt(),
    };
  }

  public createFromSchema(
    vehicleStatusSchema: VehicleStatusSchema | null,
  ): VehicleStatus | null {
    if (!vehicleStatusSchema) return null;

    return new VehicleStatus({
      ...vehicleStatusSchema,
      _id: vehicleStatusSchema._id.toHexString(),
    });
  }
}
