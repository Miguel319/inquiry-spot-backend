import { SharedTranslations } from "@/common/application/translations";
import { NameType } from "@/common/domain/entities";
import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { VehicleMakeTranslations } from "@/vehicle-post/application/translations";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import paginate from "mongoose-paginate-v2";
import { Document } from "mongoose";

export type VehicleMakeDocument = VehicleMakeSchema & Document;

@Schema({ versionKey: false, timestamps: true, collection: "vehiclemakes" })
export class VehicleMakeSchema extends BaseSchema {
  @Prop({
    type: {
      es: {
        type: String,
        required: [true, SharedTranslations.NAME_ES],
        index: true,
        unique: [true, VehicleMakeTranslations.NAME_UNIQUE_ES],
      },
      en: {
        type: String,
        required: [true, SharedTranslations.NAME_EN],
        index: true,
        unique: [true, VehicleMakeTranslations.NAME_UNIQUE_EN],
      },
    },
    required: [true, VehicleMakeTranslations.NAME],
    index: true,
    unique: true,
  })
  readonly name: NameType;
}

export const SchemaVehicleMake =
  SchemaFactory.createForClass(VehicleMakeSchema);

SchemaVehicleMake.plugin(paginate);
