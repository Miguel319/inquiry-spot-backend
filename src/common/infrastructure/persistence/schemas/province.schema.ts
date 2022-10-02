import { NameType } from "@/common/domain/entities";
import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import paginate from "mongoose-paginate-v2";
import { Document } from "mongoose";
import { ProvinceTranslations } from "@/common/application/translations";
import { SharedTranslations } from "@/common/application/translations";

export type ProvinceDocument = ProvinceSchema & Document;

@Schema({
  versionKey: false,
  timestamps: true,
  collection: "provinces",
})
export class ProvinceSchema extends BaseSchema {
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
    required: [true, ProvinceTranslations.NAME],
    index: {
      unique: true,
      collation: { strength: 2, locale: "en" },
    },
  })
  readonly name: NameType;
}

export const SchemaProvince = SchemaFactory.createForClass(ProvinceSchema);

SchemaProvince.plugin(paginate);
