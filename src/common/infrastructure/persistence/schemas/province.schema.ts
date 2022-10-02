import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import paginate from "mongoose-paginate-v2";
import { Document } from "mongoose";
import { ProvinceTranslations } from "@/common/application/translations";

export type ProvinceDocument = ProvinceSchema & Document;

@Schema({
  versionKey: false,
  timestamps: true,
  collection: "provinces",
})
export class ProvinceSchema extends BaseSchema {
  @Prop({
    required: [true, ProvinceTranslations.NAME],
    index: true,
    unique: true,
  })
  readonly name: string;
}

export const SchemaProvince = SchemaFactory.createForClass(ProvinceSchema);

SchemaProvince.plugin(paginate);
