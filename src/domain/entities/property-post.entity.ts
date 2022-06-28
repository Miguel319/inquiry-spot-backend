import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaAlt } from "mongoose";
import {
  Address,
  BuyingOption,
  PropertyPostsTranslations,
  PropertyStatus,
  PropertyType,
  SharedTranslations,
} from "../types";

import paginate from "mongoose-paginate-v2";

export type PropertyPostDocument = PropertyPost & Document;

const {
  Types: { ObjectId },
} = SchemaAlt;

@Schema({ timestamps: true })
export class PropertyPost {
  _id: string;

  @Prop({ required: [true, PropertyPostsTranslations.DESCRIPTION] })
  description: string;

  @Prop({
    type: Number,
    required: [true, PropertyPostsTranslations.BATHROOM_COUNT],
    isInteger: [true, PropertyPostsTranslations.BATHROOM_COUNT_INT],
  })
  bathroomCount: number;

  @Prop({
    type: Number,
    required: [true, PropertyPostsTranslations.BEDROOM_COUNT],
    isInteger: [true, PropertyPostsTranslations.BEDROOM_COUNT_INT],
  })
  bedroomCount: number;

  @Prop({
    type: Number,
    required: [true, PropertyPostsTranslations.PARKING_LOT_COUNT],
    isInteger: [true, PropertyPostsTranslations.PARKING_LOT_COUNT_INT],
  })
  parkingLotCount: number;

  @Prop({ required: [true, PropertyPostsTranslations.PRICE] })
  price: string;

  @Prop({
    type: ObjectId,
    ref: "User",
    required: [true, PropertyPostsTranslations.SELLER],
  })
  seller: string;

  @Prop({ type: Number })
  territory: number;

  @Prop({
    required: [true, PropertyPostsTranslations.BUYING_OPTION],
    enum: BuyingOption,
    type: String,
  })
  buyingOption: BuyingOption;

  @Prop({
    required: [true, PropertyPostsTranslations.PROPERTY_TYPE],
    enum: PropertyType,
    type: String,
  })
  propertyType: PropertyType;

  @Prop({
    required: [true, PropertyPostsTranslations.PROPERTY_STATUS],
    type: String,
    enum: PropertyStatus,
  })
  propertyStatus: PropertyStatus;

  @Prop({
    type: String,
    required: [true, PropertyPostsTranslations.PRIMARY_IMAGE],
  })
  primaryImage: string;

  @Prop([
    {
      type: String,
      required: [true, PropertyPostsTranslations.SECONDARY_IMAGES],
    },
  ])
  secondaryImages: string[];

  @Prop([
    {
      type: String,
      required: [true, PropertyPostsTranslations.ADDITIONAL_INFO],
    },
  ])
  additionalInfo: string[];

  @Prop({
    type: {
      addressLine1: {
        type: String,
        required: [true, SharedTranslations.ADDRESS__ADDRESS_LINE_1],
      },
      city: {
        type: String,
        required: [true, SharedTranslations.ADDRESS__CITY],
      },
      province: {
        type: String,
        required: [true, SharedTranslations.ADDRESS__PROVINCE],
      },
    },
  })
  address: Address;

  createdAt: Date;

  updatedAt: Date;
}

export const PropertyPostSchema = SchemaFactory.createForClass(PropertyPost);

PropertyPostSchema.plugin(paginate);
