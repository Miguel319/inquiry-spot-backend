import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaAlt } from "mongoose";
import { UserTranslations } from "../types";

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

  @Prop({ required: [true, UserTranslations.NAME] })
  name: string;

  @Prop({
    required: [true, UserTranslations.REQUIRED_EMAIL],
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, UserTranslations.INVALID_EMAIL],
    trim: true,
  })
  email: string;

  @Prop({
    required: [true, UserTranslations.PASSWORD],
    minlength: [6, UserTranslations.PASSWORD_MIN_LENGTH],
    trim: true,
    select: false,
  })
  password: string;

  @Prop({
    minlength: [11, UserTranslations.MIN_LENGTH_IDENTIFICATION_NUMBER],
    maxlength: [11, UserTranslations.MAX_LENGTH_IDENTIFICATION_NUMBER],
  })
  identificationNumber: string;

  @Prop({
    enum: [Role, UserTranslations.INVALID_ROLE],
    type: String,
    required: [true, UserTranslations.ROLE],
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
