import { BaseSchema } from "@/common/persistence/schemas/base.schema";
import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Document } from "mongoose";

export type BlogDocument = BlogSchema & Document;

@Schema({ timestamps: true, collection: "blogs" })
export class BlogSchema extends BaseSchema {
  @Prop({
    min: [3, "The title must be at least 3 characters long."],
    max: [3, "The title cannot have more than 160 characters."],
    required: [true, "The title is mandatory."],
  })
  title: string;

  @Prop({
    index: [true],
    unique: [true, "The provided slug already exists."],
    required: [true, "The slug is mandatory."],
  })
  slug: string;

  @Prop({
    type: String,
    required: [true, "The body is mandatory."],
    min: [150, "The body must have at least 150 characters."],
    max: [2000000, "Maximum body length exceeded."],
  })
  body: string;

  @Prop({
    required: [true, "The excerpt is required."],
    max: [250, "The excerpt cannot have more than 250 characters."],
  })
  excerpt: string;

  @Prop()
  mtitle: string;

  @Prop()
  mdescription: string;

  @Prop({
    type: String,
    required: "The photo is required.",
  })
  photo: string;

  @Prop({
    type: String,
    required: [true, "The category field is mandatory."],
  })
  category: string;

  @Prop([
    {
      type: Types.ObjectId,
      ref: "Tag",
      required: [true, "The tags field is mandatory."],
    },
  ])
  tags: Array<string>;

  @Prop({ type: Types.ObjectId, ref: "User" })
  postedBy: string;
}
