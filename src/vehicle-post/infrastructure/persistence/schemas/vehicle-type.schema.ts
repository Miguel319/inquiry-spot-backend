import { SharedTranslations } from "@/common/application/translations";
import { NameType } from "@/common/domain/entities";
import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { VehicleTypeTranslations } from "@/vehicle-post/application/translations";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export type VehicleTypeDocument = VehicleTypeSchema & Document;

@Schema({ versionKey: false, timestamps: true, collection: "vehicletypes" })
export class VehicleTypeSchema extends BaseSchema {
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
    required: [true, VehicleTypeTranslations.NAME],
    index: true,
    unique: true,
  })
  readonly name: NameType;
}

export const SchemaVehicleType =
  SchemaFactory.createForClass(VehicleTypeSchema);

SchemaVehicleType.plugin(paginate);
