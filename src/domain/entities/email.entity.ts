import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { EmailTranslations } from "../types";

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

  @Prop({ required: [true, EmailTranslations.SUBJECT] })
  subject: string;

  @Prop({ required: [true, EmailTranslations.BODY] })
  body: string;

  @Prop({
    type: {
      name: {
        required: [true, EmailTranslations.FROM_NAME],
        type: String,
      },
      email: {
        type: String,
        required: [true, EmailTranslations.FROM_EMAIL],
        lowercase: true,
        match: [
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          EmailTranslations.INVALID_FROM_EMAIL,
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
    required: [true, EmailTranslations.RECIPIENT_EMAIL_ADDRESS],
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      EmailTranslations.INVALID_RECIPIENT_EMAIL_ADDRESS,
    ],
    trim: true,
  })
  recipientEmailAddress: string;

  createdAt: Date;

  updatedAt: Date;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
