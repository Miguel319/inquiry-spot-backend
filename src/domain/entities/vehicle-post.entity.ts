import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type VehiclePostDocument = VehiclePost & Document;

@Schema({ timestamps: true })
export class VehiclePost {
  _id: string;

  @Prop({ required: [true, "The title is mandatory."] })
  title: string;

  @Prop({ required: [true, "The description is mandatory."] })
  description: string;

  @Prop({ required: [true, "The make is mandatory."] })
  make: string;

  @Prop({ required: [true, "The type is mandatory."] })
  type: string;

  @Prop({ required: [true, "The price is mandatory."], type: Number })
  price: number;

  @Prop({ required: [true, "The exterior color is mandatory."] })
  exteriorColor: string;

  @Prop({ required: [true, "The interior color is mandatory."] })
  interiorColor: string;

  @Prop({ required: [true, "The traction is mandatory."] })
  traction: string;

  @Prop({ required: [true, "The motor is mandatory."] })
  motor: string;

  @Prop({ required: [true, "The speed is mandatory."] })
  speed: string;

  @Prop({ required: [true, "The fuel type is mandatory."] })
  fuelType: string;

  @Prop({ required: [true, "The is new field is mandatory."], type: Boolean })
  isNew: boolean;

  @Prop()
  use: string;

  @Prop({ required: [true, "The accesories is mandatory."] })
  accessories: string[];

  @Prop()
  address: string;

  createdAt: Date;

  updatedAt: Date;
}

export const VehiclePostSchema = SchemaFactory.createForClass(VehiclePost);
