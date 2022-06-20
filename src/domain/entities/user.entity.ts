import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop({ required: [true, "validations.user.name"] })
  name: string;

  @Prop({
    required: [true, "validations.user.requiredEmail"],
    unique: true,
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
