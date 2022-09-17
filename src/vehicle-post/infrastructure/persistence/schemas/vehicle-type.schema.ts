import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { VehicleTypeTranslations } from "@/vehicle-post/application/translations";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export type VehicleTypeDocument = VehicleTypeSchema & Document;

@Schema({ timestamps: true, collection: "vehicletypes" })
export class VehicleTypeSchema extends BaseSchema {
  @Prop({
    required: [true, VehicleTypeTranslations.NAME],
  })
  readonly name: string;
}

export const SchemaVehicleType =
  SchemaFactory.createForClass(VehicleTypeSchema);

SchemaVehicleType.plugin(paginate);
