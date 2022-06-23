import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaAlt } from "mongoose";
import { Address, BuyingOption, PropertyStatus, PropertyType } from "../types";

export type PropertyPostDocument = PropertyPost & Document;

const {
  Types: { ObjectId },
} = SchemaAlt;

@Schema({ timestamps: true })
export class PropertyPost {
  _id: string;

  @Prop({ required: [true, "validations.propertyPost.description"] })
  description: string;

  @Prop({
    type: Number,
    required: [true, "validations.propertyPost.bathroomCount"],
  })
  bathroomCount: number;

  @Prop({
    type: Number,
    required: [true, "validations.propertyPost.bedroomCount"],
  })
  bedroomCount: number;

  @Prop({
    type: Number,
    required: [true, "validations.propertyPost.parkingLotCount"],
  })
  parkingLotCount: number;

  @Prop({ required: [true, "validations.propertyPost.price"] })
  price: string;

  @Prop({
    type: ObjectId,
    ref: "User",
    required: [true, "validations.propertyPost.seller"],
  })
  seller: string;

  @Prop({ type: Number })
  territory: number;

  @Prop({
    required: [true, "validations.propertyPost.buyingOption"],
    enum: BuyingOption,
    type: String,
  })
  buyingOption: BuyingOption;

  @Prop({
    required: [true, "validations.propertyPost.propertyType"],
    enum: PropertyType,
    type: String,
  })
  propertyType: PropertyType;

  @Prop({
    required: [true, "validations.propertyPost.propertyStatus"],
    type: String,
    enum: PropertyStatus,
  })
  propertyStatus: PropertyStatus;

  @Prop({
    type: String,
    required: [true, "validations.propertyPost.primaryImage"],
  })
  primaryImage: string;

  @Prop([
    {
      type: String,
      required: [true, "validations.propertyPost.secondaryImages"],
    },
  ])
  secondaryImages: string[];

  @Prop([
    {
      type: String,
      required: [true, "validations.propertyPost.additionalInfo"],
    },
  ])
  additionalInfo: string[];

  @Prop({
    type: {
      addressLine1: {
        type: String,
        required: [true, "validations.vehiclePost.address.addressLine1"],
      },
      city: {
        type: String,
        required: [true, "validations.vehiclePost.address.city"],
      },
      province: {
        type: String,
        required: [true, "validations.vehiclePost.address.province"],
      },
    },
  })
  address: Address;

  createdAt: Date;

  updatedAt: Date;
}

export const PropertyPostSchema = SchemaFactory.createForClass(PropertyPost);
