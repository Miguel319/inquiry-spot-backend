import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import paginate from "mongoose-paginate-v2";
import { Document, Types } from "mongoose";
import { MunicipalityTranslations } from "@/common/application/translations";

export type MunicipalityDocument = MunicipalitySchema & Document;

@Schema({
  versionKey: false,
  timestamps: true,
  collection: "municipalities",
})
export class MunicipalitySchema extends BaseSchema {
  @Prop({
    required: [true, MunicipalityTranslations.NAME],
    index: true,
    unique: true,
  })
  readonly name: string;

  @Prop({
    ref: "provinces",
    type: Types.ObjectId,
  })
  readonly province: Types.ObjectId;
}

export const SchemaMunicipality =
  SchemaFactory.createForClass(MunicipalitySchema);

SchemaMunicipality.plugin(paginate);
