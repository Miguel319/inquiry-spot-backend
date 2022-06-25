import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaAlt } from "mongoose";

export type UserDocument = User & Document;

export enum Role {
  CLIENT = "Client",
  SELLER = "Seller",
  MIXED = "Mixed",
}

const {
  Types: { ObjectId },
} = SchemaAlt;

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop({ required: [true, "validations.user.name"] })
  name: string;

  @Prop({
    required: [true, "validations.user.requiredEmail"],
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "validations.user.invalidEmail"],
    trim: true,
  })
  email: string;

  @Prop({
    required: [true, "validations.user.password"],
    minlength: [6, "validations.user.passwordMinLength"],
    trim: true,
    select: false,
  })
  password: string;

  @Prop({
    minlength: [11, "validations.user.minLengthIdentificationNumber"],
    maxlength: [11, "validations.user.maxLengthIdentificationNumber"],
  })
  identificationNumber: string;

  @Prop({
    enum: [Role, "validations.user.invalidRole"],
    type: String,
    required: [true, "validations.user.role"],
  })
  role: Role;

  @Prop([
    {
      type: ObjectId,
      ref: "VehiclePost",
      select: false,
    },
  ])
  vehiclePostsPublished?: string[];

  @Prop([
    {
      type: ObjectId,
      ref: "PropertyPost",
      select: false,
    },
  ])
  propertyPostsPublished?: string[];

  @Prop([
    {
      type: ObjectId,
      ref: "VehiclePost",
      select: false,
    },
  ])
  vehiclePostsInterests?: string[];

  @Prop([
    {
      type: ObjectId,
      ref: "PropertyPost",
      select: false,
    },
  ])
  propertyPostsInterests?: string[];

  @Prop({
    type: String,
  })
  resetPasswordToken?: string;

  @Prop({
    type: Number,
  })
  resetPasswordExpire?: number;

  @Prop({ data: Buffer, contentType: String })
  photo: string;

  @Prop()
  resetPasswordLink: string;

  createdAt: Date;

  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
