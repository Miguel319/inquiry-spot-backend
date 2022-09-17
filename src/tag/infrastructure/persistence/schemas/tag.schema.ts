import { BaseEntity } from "@/common/domain/entities";
import { TagTranslations } from "@/tag/application/translations";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TagDocument = Tag & Document;

@Schema({ versionKey: false, timestamps: true })
export class Tag extends BaseEntity {
  @Prop({
    required: [true, TagTranslations.NAME],
    max: [32, TagTranslations.NAME_LENGTH],
    unique: [true, TagTranslations.SLUG_DUPLICATE],
  })
  name: string;

  @Prop({
    required: [true, TagTranslations.SLUG],
    lowercase: [true, TagTranslations.SLUG_LOWERCASE],
    unique: [true, TagTranslations.SLUG_DUPLICATE],
    index: [true],
  })
  slug: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
