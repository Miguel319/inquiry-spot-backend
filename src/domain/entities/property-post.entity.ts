import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaAlt } from "mongoose";
import {
  Address,
  BuyingOption,
  Currency,
  Price,
  PropertyPostsTranslations,
  PropertyStatus,
  PropertyType,
  SharedTranslations,
} from "../types";

import paginate from "mongoose-paginate-v2";
import { BaseEntity } from "./base.entity";

export type PropertyPostDocument = PropertyPost & Document;

const {
  Types: { ObjectId },
} = SchemaAlt;

@Schema({ timestamps: true })
export class PropertyPost extends BaseEntity {
  @Prop({ required: [true, PropertyPostsTranslations.DESCRIPTION] })
  readonly description: string;

  @Prop({
    type: Number,
    required: [true, PropertyPostsTranslations.BATHROOM_COUNT],
    isInteger: [true, PropertyPostsTranslations.BATHROOM_COUNT_INT],
  })
  readonly bathroomCount: number;

  @Prop({
    type: Number,
    required: [true, PropertyPostsTranslations.BEDROOM_COUNT],
    isInteger: [true, PropertyPostsTranslations.BEDROOM_COUNT_INT],
  })
  readonly bedroomCount: number;

  @Prop({
    type: Number,
    required: [true, PropertyPostsTranslations.PARKING_LOT_COUNT],
    isInteger: [true, PropertyPostsTranslations.PARKING_LOT_COUNT_INT],
  })
  readonly parkingLotCount: number;

  @Prop({
    type: {
      value: {
        type: Number,
      },
      currency: {
        type: String,
        enum: [Currency],
      },
    },
    required: [true, PropertyPostsTranslations.PRICE],
  })
  readonly price: Price;
  @Prop({
    type: ObjectId,
    ref: "User",
    required: [true, PropertyPostsTranslations.SELLER],
  })
  readonly seller: string;

  @Prop({ type: Number })
  readonly territory: number;

  @Prop({
    required: [true, PropertyPostsTranslations.BUYING_OPTION],
    enum: BuyingOption,
    type: String,
  })
  readonly buyingOption: BuyingOption;

  @Prop({
    required: [true, PropertyPostsTranslations.PROPERTY_TYPE],
    enum: PropertyType,
    type: String,
  })
  readonly propertyType: PropertyType;

  @Prop({
    required: [true, PropertyPostsTranslations.PROPERTY_STATUS],
    type: String,
    enum: PropertyStatus,
  })
  readonly propertyStatus: PropertyStatus;

  @Prop({
    type: String,
    required: [true, PropertyPostsTranslations.PRIMARY_IMAGE],
  })
  readonly primaryImage: string;

  @Prop([
    {
      type: String,
      required: [true, PropertyPostsTranslations.SECONDARY_IMAGES],
    },
  ])
  readonly secondaryImages: string[];

  @Prop([
    {
      type: String,
      required: [true, PropertyPostsTranslations.ADDITIONAL_INFO],
    },
  ])
  readonly additionalInfo: string[];

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
  readonly address: Address;
}

export const PropertyPostSchema = SchemaFactory.createForClass(PropertyPost);

PropertyPostSchema.plugin(paginate);
