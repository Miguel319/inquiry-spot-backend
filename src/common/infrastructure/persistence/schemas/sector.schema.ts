import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import paginate from "mongoose-paginate-v2";
import { Document, Schema as SchemaAlt } from "mongoose";
import { SectorTranslations } from "@/common/application/translations";
import { IDefaultName } from "@/common/domain/types";

const {
  Types: { ObjectId },
} = SchemaAlt;

export type SectorDocument = SectorSchema & Document;

@Schema({
  versionKey: false,
  collection: "sectors",
  timestamps: true,
})
export class SectorSchema extends BaseSchema {
  @Prop({
    required: [true, SectorTranslations.NAME],
    index: true,
    unique: true,
  })
  readonly name: string;

  @Prop({
    type: {
      _id: {
        ref: "municipalities",
        type: ObjectId,
        unique: false,
      },
      value: {
        type: String,
      },
    },
  })
  readonly municipality: IDefaultName;
}

export const SchemaSector = SchemaFactory.createForClass(SectorSchema);

SchemaSector.plugin(paginate);
