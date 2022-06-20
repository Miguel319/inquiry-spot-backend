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

  @Prop({ required: [true, "validations.email.subject"] })
  subject: string;

  @Prop({ required: [true, "validations.email.body"] })
  body: string;

  @Prop({
    type: {
      name: {
        required: [true, "validations.email.fromName"],
        type: String,
      },
      email: {
        type: String,
        required: [true, "validations.email.fromEmail"],
        lowercase: true,
        match: [
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "validations.email.invalidFromEmail",
        ],
        trim: true,
      },
    },
  })
  from: {
    name: string;
    email: string;
  };

  @Prop({
    required: [true, "validations.email.recipientEmailAddress"],
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "validations.email.invalidRecipientEmailAddress",
    ],
    trim: true,
  })
  recipientEmailAddress: string;

  createdAt: Date;

  updatedAt: Date;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
