import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop({ required: [true, "The name is mandatory."] })
  name: string;

  @Prop({
    required: [true, "The email is mandatory."],
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "The provided email is invalid."],
    trim: true,
  })
  email: string;

  @Prop({
    required: [true, "The password is mandatory."],
    minlength: [6, "The password must have at least 6 characters."],
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
