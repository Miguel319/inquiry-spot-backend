import { EntitySchemaFactory } from "@/common/infrastructure/factories";
import { PropertyPost } from "@/real-state/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { PropertyPostSchema } from "../../persistence/schemas";

@Injectable()
export class PropertyPostSchemaFactory
  implements EntitySchemaFactory<PropertyPostSchema, PropertyPost>
{
  public create(propertyPost: PropertyPost): PropertyPostSchema {
    return {
      _id: new Types.ObjectId(propertyPost.getId()),
      name: propertyPost.getName(),
      address: propertyPost.getAddress(),
      bathroomCount: propertyPost.getBathroomCount(),
      bedroomCount: propertyPost.getBedroomCount(),
      buyingOption: propertyPost.getBuyingOption(),
      description: propertyPost.getDescription(),
      exteriorColor: propertyPost.getExteriorColor(),
      interiorColor: propertyPost.getInteriorColor(),
      landSize: propertyPost.getLandSize(),
      parkingLotCount: propertyPost.getParkingLotCount(),
      price: propertyPost.getPrice(),
      primaryImage: propertyPost.getPrimaryImage(),
      secondaryImages: propertyPost.getSecondaryImages(),
      seller: propertyPost.getSeller(),
      status: propertyPost.getStatus(),
      type: propertyPost.getType(),
      yearOfConstruction: propertyPost.getYearOfConstruction(),
      additionalInfo: propertyPost.getAdditionalInfo(),
      createdAt: propertyPost.getCreatedAt(),
      updatedAt: propertyPost.getUpdatedAt(),
    };
  }

  public createFromSchema(
    entitySchema: PropertyPostSchema | null,
  ): PropertyPost | null {
    if (!entitySchema) return null;

    return new PropertyPost({
      ...entitySchema,
      _id: entitySchema._id.toHexString(),
    });
  }
}
