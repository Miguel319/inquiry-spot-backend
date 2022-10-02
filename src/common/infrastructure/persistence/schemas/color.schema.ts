import { NameType } from "@/common/domain/entities";
import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import paginate from "mongoose-paginate-v2";
import { Document } from "mongoose";
import { ColorTranslations } from "@/common/application/translations";
import { SharedTranslations } from "@/common/application/translations";

export type ColorDocument = ColorSchema & Document;

@Schema({
  versionKey: false,
  timestamps: true,
  collection: "colors",
})
export class ColorSchema extends BaseSchema {
  @Prop({
    type: {
      es: {
        type: String,
        required: [true, SharedTranslations.NAME_ES],
        index: true,
        unique: true,
      },
      en: {
        type: String,
        required: [true, SharedTranslations.NAME_EN],
        index: true,
        unique: true,
      },
    },
    required: [true, ColorTranslations.NAME],
    index: {
      unique: true,
      collation: { strength: 2, locale: "en" },
    },
  })
  readonly name: NameType;
}

export const SchemaColor = SchemaFactory.createForClass(ColorSchema);

SchemaColor.plugin(paginate);
