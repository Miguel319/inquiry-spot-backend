import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaAlt } from "mongoose";
import {
  Color,
  VehicleType,
  ElectricValues,
  VehicleMake,
  Fuel,
  Transmission,
  VehicleStatus,
  VehiclePostTranslations,
  Price,
  Traction,
  Currency,
} from "../types";

import paginate from "mongoose-paginate-v2";
import { BaseEntity } from "@/common/domain/entities";

const {
  Types: { ObjectId },
} = SchemaAlt;

export type VehiclePostDocument = VehiclePost & Document;

@Schema({ timestamps: true })
export class VehiclePost extends BaseEntity {
  @Prop({ required: [true, VehiclePostTranslations.DESCRIPTION] })
  description: string;

  @Prop({
    required: [true, VehiclePostTranslations.MAKE],
    enum: VehicleMake,
  })
  make: VehicleMake;

  @Prop({
    required: [true, VehiclePostTranslations.MODEL],
  })
  model: string;

  @Prop({
    required: [true, VehiclePostTranslations.TYPE],
    enum: VehicleType,
    type: String,
  })
  type: VehicleType;

  @Prop({
    type: String,
    enum: Transmission,
    required: [true, VehiclePostTranslations.TRANSMISSION],
  })
  transmission: Transmission;

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
    required: [true, VehiclePostTranslations.PRICE],
  })
  price: Price;

  @Prop({
    required: [true, VehiclePostTranslations.DOOR_COUNT],
    isInteger: [true, VehiclePostTranslations.DOOR_COUNT_INT],
  })
  doorCount: number;

  @Prop({
    required: [true, VehiclePostTranslations.EXTERIOR_COLOR],
    enum: Color,
    type: String,
  })
  exteriorColor: Color;

  @Prop({
    required: [true, VehiclePostTranslations.INTERIOR_COLOR],
    enum: Color,
    type: String,
  })
  interiorColor: Color;

  @Prop()
  traction: Traction;

  @Prop()
  topSpeed: string;

  @Prop({
    required: [true, VehiclePostTranslations.FUEL_TYPE],
    enum: Fuel,
    type: String,
  })
  fuelType: Fuel;

  @Prop({
    required: [true, VehiclePostTranslations.STATUS],
    enum: VehicleStatus,
    type: String,
  })
  status: VehicleStatus;

  @Prop()
  use: string;

  @Prop({ required: [true, VehiclePostTranslations.ACCESSORIES] })
  accessories: string[];

  @Prop({
    type: ObjectId,
    ref: "User",
    required: [true, VehiclePostTranslations.SELLER],
  })
  seller: string;

  @Prop({
    type: {
      range: String,
      chargingTime: String,
    },
  })
  electric: ElectricValues;

  @Prop({
    type: String,
    required: [true, VehiclePostTranslations.PRIMARY_IMAGE],
  })
  primaryImage: string;

  @Prop([
    {
      type: String,
      required: [true, VehiclePostTranslations.SECONDARY_IMAGES],
    },
  ])
  secondaryImages: string[];
}

export const VehiclePostSchema = SchemaFactory.createForClass(VehiclePost);

VehiclePostSchema.plugin(paginate);
