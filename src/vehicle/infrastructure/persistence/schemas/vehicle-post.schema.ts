import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, Schema as SchemaAlt } from "mongoose";

import paginate from "mongoose-paginate-v2";
import { VehiclePostTranslations } from "@/vehicle/application/translations";
import { ElectricValues } from "@/vehicle/domain/types";
import {
  Currency,
  IAddress,
  IDefaultI18nName,
  IDefaultName,
  Price,
} from "@/common/domain/types/common";
import {
  BaseSchema,
  ColorSchema,
} from "@/common/infrastructure/persistence/schemas";

const {
  Types: { ObjectId },
} = SchemaAlt;

export type VehiclePostDocument = VehiclePostSchema & Document;

@Schema({ versionKey: false, timestamps: true, collection: "vehicleposts" })
export class VehiclePostSchema extends BaseSchema {
  @Prop({ required: [true, VehiclePostTranslations.DESCRIPTION] })
  readonly description: string;

  @Prop({
    type: {
      _id: {
        ref: "vehiclemakes",
        type: Types.ObjectId,
      },
      value: String,
    },
    required: [true, VehiclePostTranslations.MAKE],
  })
  readonly make: IDefaultName;

  @Prop({
    required: [true, VehiclePostTranslations.MODEL],
  })
  model: string;

  @Prop({
    type: {
      _id: {
        ref: "vehicletypes",
        type: Types.ObjectId,
      },
      value: {
        en: String,
        es: String,
      },
    },
    required: [true, VehiclePostTranslations.TYPE],
  })
  type: IDefaultI18nName;

  @Prop({
    type: {
      _id: {
        ref: "transmissions",
        type: Types.ObjectId,
      },
      value: {
        en: String,
        es: String,
      },
    },
    required: [true, VehiclePostTranslations.TRANSMISSION],
  })
  readonly transmission: IDefaultI18nName;

  @Prop({
    type: {
      value: {
        type: Number,
      },
      currency: {
        type: String,
        enum: [Currency],
      },
    },
    required: [true, VehiclePostTranslations.PRICE],
  })
  readonly price: Price;

  @Prop({
    type: Number,
    required: [true, VehiclePostTranslations.YEAR],
    isInteger: true,
  })
  readonly year: number;

  @Prop({
    type: Number,
    required: [true, VehiclePostTranslations.DOOR_COUNT],
    isInteger: [true, VehiclePostTranslations.DOOR_COUNT_INT],
  })
  readonly doorCount: number;

  @Prop({
    type: {
      _id: {
        ref: ColorSchema.name,
        type: ObjectId,
      },
      value: {
        en: String,
        es: String,
      },
    },
    required: [true, VehiclePostTranslations.EXTERIOR_COLOR],
  })
  readonly exteriorColor: IDefaultI18nName & { hexValue: string };

  @Prop({
    type: {
      _id: {
        ref: ColorSchema.name,
        type: ObjectId,
      },
      value: {
        en: String,
        es: String,
      },
      hexValue: String,
    },
    required: [true, VehiclePostTranslations.INTERIOR_COLOR],
  })
  readonly interiorColor: IDefaultI18nName & { hexValue: string };

  @Prop({
    type: {
      _id: {
        ref: "tractions",
        type: Types.ObjectId,
      },
      value: {
        en: String,
        es: String,
      },
      hexValue: String,
    },
  })
  readonly traction: IDefaultI18nName;

  @Prop()
  readonly topSpeed: string;

  @Prop({
    type: {
      _id: {
        ref: "fuels",
        type: Types.ObjectId,
      },
      value: {
        en: String,
        es: String,
      },
    },
    required: [true, VehiclePostTranslations.FUEL_TYPE],
  })
  readonly fuelType: IDefaultI18nName;

  @Prop({
    type: {
      _id: {
        ref: "vehiclestatus",
        type: Types.ObjectId,
      },
      value: {
        type: {
          en: String,
          es: String,
        },
      },
    },
    required: [true, VehiclePostTranslations.STATUS],
  })
  readonly status: IDefaultI18nName;

  @Prop()
  readonly use?: string;

  @Prop([
    { type: String, required: [true, VehiclePostTranslations.ACCESSORIES] },
  ])
  readonly accessories: string[];

  @Prop({
    type: {
      formal: {
        addressLine1: String,
        municipality: {
          _id: {
            ref: "municipalities",
            type: Types.ObjectId,
          },
          value: {
            type: String,
          },
        },
        province: {
          _id: {
            ref: "provinces",
            type: Types.ObjectId,
          },
          value: {
            type: String,
          },
        },
        sector: {
          _id: {
            ref: "sectors",
            type: Types.ObjectId,
          },
          value: {
            type: String,
          },
        },
      },
      informal: {
        type: String,
      },
    },
    required: [true, VehiclePostTranslations.ADDRESS],
  })
  readonly address: {
    formal?: IAddress;
    informal?: string;
  };

  @Prop({
    type: Number,
    default: 0,
  })
  readonly cylinders: number;

  @Prop({
    type: {
      _id: {
        ref: "users",
        type: Types.ObjectId,
        unique: false,
      },
      value: {
        type: String,
      },
    },
    required: [true, VehiclePostTranslations.SELLER],
  })
  readonly seller: IDefaultName;

  @Prop({
    type: {
      range: String,
      chargingTime: String,
    },
  })
  readonly electric: ElectricValues | null;

  @Prop({
    type: String,
    required: [true, VehiclePostTranslations.PRIMARY_IMAGE],
  })
  readonly primaryImage: string;

  @Prop([
    {
      type: String,
      required: [true, VehiclePostTranslations.SECONDARY_IMAGES],
    },
  ])
  readonly secondaryImages: string[];
}

export const SchemaVehiclePosts =
  SchemaFactory.createForClass(VehiclePostSchema);

SchemaVehiclePosts.plugin(paginate);
