import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { VehicleMakeTranslations } from "@/vehicle/application/translations";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import paginate from "mongoose-paginate-v2";
import { Document } from "mongoose";

export type VehicleMakeDocument = VehicleMakeSchema & Document;

@Schema({ versionKey: false, timestamps: true, collection: "vehiclemakes" })
export class VehicleMakeSchema extends BaseSchema {
  @Prop({
    required: [true, VehicleMakeTranslations.NAME],
    index: true,
    unique: true,
  })
  readonly name: string;
}

export const SchemaVehicleMake =
  SchemaFactory.createForClass(VehicleMakeSchema);

SchemaVehicleMake.plugin(paginate);
