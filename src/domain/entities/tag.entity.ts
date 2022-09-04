import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TagDocument = Tag & Document;

@Schema({ timestamps: true })
export class Tag {
  _id: string;

  @Prop({
    required: [true, "The name is mandatory."],
    max: [32, "The name can't have more than 32 characters."],
    unique: [true, "The provided name already exists."],
  })
  name: string;

  @Prop({
    required: [true, "The slug is mandatory."],
    lowercase: [true, "The slug must be in lower case"],
    unique: [true, "The provided slug already exists."],
    index: [true],
  })
  slug: string;

  createdAt: Date;

  updatedAt: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
