import { NameType } from "@/common/domain/entities";
import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import paginate from "mongoose-paginate-v2";
import { Document } from "mongoose";
import { FuelTranslations } from "@/vehicle-post/application/translations";
import { SharedTranslations } from "@/common/application/translations";

export type FuelDocument = FuelSchema & Document;

@Schema({
  versionKey: false,
  timestamps: true,
  collection: "fuels",
})
export class FuelSchema extends BaseSchema {
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
    required: [true, FuelTranslations.NAME],
    index: true,
    unique: true,
  })
  readonly name: NameType;
}

export const SchemaFuel = SchemaFactory.createForClass(FuelSchema);

SchemaFuel.plugin(paginate);
