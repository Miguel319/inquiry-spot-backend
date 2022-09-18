import { NameType } from "@/common/domain/entities";
import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import paginate from "mongoose-paginate-v2";
import { Document } from "mongoose";
import { FuelTranslations } from "@/vehicle-post/application/translations";

export type FuelDocument = FuelSchema & Document;

@Schema({
  versionKey: false,
  timestamps: true,
  collection: "fuels",
})
export class FuelSchema extends BaseSchema {
  @Prop({
    required: [true, FuelTranslations.NAME],
    index: true,
    unique: true,
  })
  readonly name: NameType;
}

export const SchemaFuel = SchemaFactory.createForClass(FuelSchema);

SchemaFuel.plugin(paginate);
