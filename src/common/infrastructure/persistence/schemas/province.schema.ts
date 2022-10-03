import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import paginate from "mongoose-paginate-v2";
import { Document, Types } from "mongoose";
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
    unique: true,
  })
  readonly name: string;

  @Prop([
    {
      type: Types.ObjectId,
      ref: "municipalities",
      default: [],
    },
  ])
  readonly municipalities: Types.ObjectId[];
}

export const SchemaProvince = SchemaFactory.createForClass(ProvinceSchema);

SchemaProvince.plugin(paginate);
