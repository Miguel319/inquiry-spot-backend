import { EntitySchemaFactory } from "@/common/infrastructure/factories";
import { VehiclePost } from "@/vehicle/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { VehiclePostSchema } from "../../persistence/schemas";

@Injectable()
export class VehiclePostSchemaFactory
  implements EntitySchemaFactory<VehiclePostSchema, VehiclePost>
{
  public create(vehiclePost: VehiclePost): VehiclePostSchema {
    return {
      _id: new Types.ObjectId(vehiclePost.getId()),
      accessories: vehiclePost.getAccessories(),
      address: vehiclePost.getAddress(),
      cylinders: vehiclePost.getCylinders(),
      description: vehiclePost.getDescription(),
      doorCount: vehiclePost.getDoorCount(),
      electric: vehiclePost.getElectric(),
      year: vehiclePost.getYear(),
      exteriorColor: vehiclePost.getExteriorColor(),
      fuelType: vehiclePost.getFuelType(),
      interiorColor: vehiclePost.getInteriorColor(),
      make: vehiclePost.getMake(),
      model: vehiclePost.getModel(),
      price: vehiclePost.getPrice(),
      primaryImage: vehiclePost.getPrimaryImage(),
      secondaryImages: vehiclePost.getSecondaryImages(),
      seller: vehiclePost.getSeller(),
      status: vehiclePost.getStatus(),
      topSpeed: vehiclePost.getTopSpeed(),
      traction: vehiclePost.getTraction(),
      transmission: vehiclePost.getTransmission(),
      type: vehiclePost.getType(),
      use: vehiclePost.getUse(),
      createdAt: vehiclePost.getCreatedAt(),
      updatedAt: vehiclePost.getUpdatedAt(),
    };
  }

  public createFromSchema(
    entitySchema: VehiclePostSchema | null,
  ): VehiclePost | null {
    if (!entitySchema) return null;

    return new VehiclePost({
      ...entitySchema,
      _id: entitySchema._id.toHexString(),
    });
  }
}
