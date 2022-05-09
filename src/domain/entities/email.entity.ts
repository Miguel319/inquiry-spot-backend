import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export interface SendgridEmailParams {
  to: string; // Recipient email address
  subject: string;
  html: string;
}

export interface SendgridEmail {
  from: {
    email: string;
    name: string;
  };
  to: string; // Recipient email address
  subject: string;
  html: string;
}

export type EmailDocument = Email & Document;

@Schema({ timestamps: true })
export class Email {
  _id: string;

  @Prop({ required: [true, "The subject is mandatory."] })
  subject: string;

  @Prop({ required: [true, "The body is mandatory."], type: String })
  body: string;

  @Prop({
    type: {
      name: {
        required: [true, "The name is mandatory."],
        type: String,
      },
      email: {
        type: String,
        required: [true, "The sender name is mandatory."],
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "The provided email is invalid."],
        trim: true,
      },
    },
  })
  from: {
    name: string;
    email: string;
  };

  @Prop({
    required: [true, "The sender address is mandatory."],
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "The provided email is invalid."],
    trim: true,
  })
  recipientEmailAddress: string;

  createdAt: Date;

  updatedAt: Date;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
