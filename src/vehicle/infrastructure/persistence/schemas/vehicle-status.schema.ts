import { SharedTranslations } from "@/common/application/translations";
import { NameType } from "@/common/domain/entities";
import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { VehicleStatusTranslations } from "@/vehicle/application/translations";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export type VehicleStatusDocument = VehicleStatusSchema & Document;

@Schema({ versionKey: false, timestamps: true, collection: "vehiclestatus" })
export class VehicleStatusSchema extends BaseSchema {
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
    required: [true, VehicleStatusTranslations.NAME],
    index: true,
    unique: true,
  })
  readonly name: NameType;
}

export const SchemaVehicleStatus =
  SchemaFactory.createForClass(VehicleStatusSchema);

SchemaVehicleStatus.plugin(paginate);
