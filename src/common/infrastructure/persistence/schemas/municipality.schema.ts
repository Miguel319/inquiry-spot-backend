import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import paginate from "mongoose-paginate-v2";
import { Document, Schema as SchemaAlt } from "mongoose";
import { MunicipalityTranslations } from "@/common/application/translations";
import { IDefaultName } from "@/common/domain/types";

const {
  Types: { ObjectId },
} = SchemaAlt;

export type MunicipalityDocument = MunicipalitySchema & Document;

@Schema({
  versionKey: false,
  collection: "municipalities",
  timestamps: true,
})
export class MunicipalitySchema extends BaseSchema {
  @Prop({
    required: [true, MunicipalityTranslations.NAME],
    index: true,
    unique: true,
  })
  readonly name: string;

  @Prop({
    type: {
      _id: {
        ref: "provinces",
        type: ObjectId,
        unique: false,
      },
      value: {
        type: String,
      },
    },
  })
  readonly province: IDefaultName;
}

export const SchemaMunicipality =
  SchemaFactory.createForClass(MunicipalitySchema);

SchemaMunicipality.plugin(paginate);
