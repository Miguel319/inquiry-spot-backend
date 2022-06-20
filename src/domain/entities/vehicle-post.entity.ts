import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaAlt } from "mongoose";
import {
  Color,
  VehicleType,
  ElectricValues,
  Fuel,
  Transmission,
  VehicleStatus,
} from "../types";

const {
  Types: { ObjectId },
} = SchemaAlt;

export type VehiclePostDocument = VehiclePost & Document;

@Schema({ timestamps: true })
export class VehiclePost {
  _id: string;

  @Prop({ required: [true, "validations.vehiclePost.description"] })
  description: string;

  @Prop({ required: [true, "validations.vehiclePost.make"] })
  make: string;

  @Prop({
    required: [true, "validations.vehiclePost.model"],
  })
  model: string;

  @Prop({
    required: [true, "validations.vehiclePost.vehicleType"],
    enum: VehicleType,
    type: String,
  })
  type: VehicleType;

  @Prop({
    type: String,
    enum: Transmission,
    required: [true, "validations.vehiclePost.transmission"],
  })
  transmission: Transmission;

  @Prop({ required: [true, "validations.vehiclePost.price"] })
  price: string;

  @Prop({
    required: [true, "validations.vehiclePost.exteriorColor"],
    enum: Color,
    type: String,
  })
  exteriorColor: Color;

  @Prop({
    required: [true, "validations.vehiclePost.interiorColor"],
    enum: Color,
    type: String,
  })
  interiorColor: Color;

  @Prop()
  traction: string;

  @Prop()
  topSpeed: string;

  @Prop({
    required: [true, "validations.vehiclePost.fuelType"],
    enum: Fuel,
    type: String,
  })
  fuelType: Fuel;

  @Prop({
    required: [true, "validations.vehiclePost.status"],
    enum: VehicleStatus,
    type: String,
  })
  status: VehicleStatus;

  @Prop()
  use: string;

  @Prop({ required: [true, "validations.vehiclePost.accessories"] })
  accessories: string[];

  @Prop({
    _id: {
      type: ObjectId,
      ref: "User",
    },
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
    required: [true, "validations.vehiclePost.primaryImage"],
  })
  primaryImage: string;

  @Prop([
    {
      type: String,
      required: [true, "validations.vehiclePost.secondaryImages"],
    },
  ])
  secondaryImages: string[];

  createdAt: Date;

  updatedAt: Date;
}

export const VehiclePostSchema = SchemaFactory.createForClass(VehiclePost);
