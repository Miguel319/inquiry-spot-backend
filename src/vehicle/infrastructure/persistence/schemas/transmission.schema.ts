import { SharedTranslations } from "@/common/application/translations";
import { NameType } from "@/common/domain/entities";
import { BaseSchema } from "@/common/infrastructure/persistence/schemas";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import paginate from "mongoose-paginate-v2";
import { Document } from "mongoose";
import { TransmissionTranslations } from "@/vehicle/application/translations";

export type TransmissionDocument = TransmissionSchema & Document;

@Schema({
  versionKey: false,
  timestamps: true,
  collection: "transmissions",
})
export class TransmissionSchema extends BaseSchema {
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
    required: [true, TransmissionTranslations.NAME],
    index: true,
    unique: true,
  })
  readonly name: NameType;
}

export const SchemaTransmission =
  SchemaFactory.createForClass(TransmissionSchema);

SchemaTransmission.plugin(paginate);
