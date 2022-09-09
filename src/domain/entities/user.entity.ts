import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaAlt } from "mongoose";
import { Role, UserTranslations } from "../types";
import { BaseEntity } from "./base.entity";

export type UserDocument = User & Document;

const {
  Types: { ObjectId },
} = SchemaAlt;

@Schema({ timestamps: true })
export class User extends BaseEntity {
  @Prop({ required: [true, UserTranslations.NAME] })
  readonly name: string;

  @Prop({
    required: [true, UserTranslations.REQUIRED_EMAIL],
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, UserTranslations.INVALID_EMAIL],
    trim: true,
  })
  readonly email: string;

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
  readonly identificationNumber: string;

  @Prop({
    enum: [Role, UserTranslations.INVALID_ROLE],
    type: String,
    required: [true, UserTranslations.ROLE],
  })
  readonly role: Role;

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
  readonly image: string;

  @Prop()
  resetPasswordLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
