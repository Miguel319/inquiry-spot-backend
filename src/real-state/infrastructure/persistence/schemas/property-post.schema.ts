import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import paginate from "mongoose-paginate-v2";
import { PropertyPostsTranslations } from "@/real-state/application/translations";
import {
  Currency,
  IAddress,
  IDefaultI18nName,
  IDefaultName,
  Price,
} from "@/common/domain/types/common";
import { PropertyBuyingOptionSchema } from "./property-buying-option.schema";
import { PropertyTypeSchema } from "./property-type.schema";
import { PropertyStatusSchema } from "./property-status.schema";
import {
  BaseSchema,
  ColorSchema,
} from "@/common/infrastructure/persistence/schemas";

export type PropertyPostDocument = PropertyPostSchema & Document;

@Schema({ timestamps: true, versionKey: false, collection: "propertyposts" })
export class PropertyPostSchema extends BaseSchema {
  @Prop({ required: [true, PropertyPostsTranslations.DESCRIPTION] })
  readonly description: string;

  @Prop({
    type: Number,
    required: [true, PropertyPostsTranslations.BATHROOM_COUNT],
    isInteger: [true, PropertyPostsTranslations.BATHROOM_COUNT_INT],
  })
  readonly bathroomCount: number;

  @Prop({
    type: Number,
    required: [true, PropertyPostsTranslations.BEDROOM_COUNT],
    isInteger: [true, PropertyPostsTranslations.BEDROOM_COUNT_INT],
  })
  readonly bedroomCount: number;

  @Prop({
    type: Number,
    required: [true, PropertyPostsTranslations.PARKING_LOT_COUNT],
    isInteger: [true, PropertyPostsTranslations.PARKING_LOT_COUNT_INT],
  })
  readonly parkingLotCount: number;

  @Prop({
    type: Number,
    isInteger: [true, PropertyPostsTranslations.YEAR_OF_CONSTRUCTION_INT],
  })
  readonly yearOfConstruction: number;

  @Prop({
    type: String,
  })
  readonly landSize: string;

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
    required: [true, PropertyPostsTranslations.PRICE],
  })
  readonly price: Price;

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
    required: [true, PropertyPostsTranslations.SELLER],
  })
  readonly seller: IDefaultName;

  @Prop({
    type: {
      _id: {
        ref: ColorSchema.name,
        type: Types.ObjectId,
      },
      value: {
        en: String,
        es: String,
      },
    },
    required: [true, PropertyPostsTranslations.EXTERIOR_COLOR],
  })
  readonly exteriorColor: IDefaultI18nName;

  @Prop({
    type: {
      _id: {
        ref: ColorSchema.name,
        type: Types.ObjectId,
      },
      value: {
        en: String,
        es: String,
      },
    },
    required: [true, PropertyPostsTranslations.INTERIOR_COLOR],
  })
  readonly interiorColor: IDefaultI18nName;

  @Prop({
    type: {
      _id: {
        ref: PropertyBuyingOptionSchema.name,
        type: Types.ObjectId,
      },
      value: {
        type: {
          en: String,
          es: String,
        },
      },
    },
    required: [true, PropertyPostsTranslations.BUYING_OPTION],
  })
  readonly buyingOption: IDefaultI18nName;

  @Prop({
    type: {
      _id: {
        ref: PropertyTypeSchema.name,
        type: Types.ObjectId,
      },
      value: {
        type: {
          en: String,
          es: String,
        },
      },
    },
    required: [true, PropertyPostsTranslations.PROPERTY_TYPE],
  })
  readonly type: IDefaultI18nName;

  @Prop({
    type: {
      _id: {
        ref: PropertyStatusSchema.name,
        type: Types.ObjectId,
      },
      value: {
        type: {
          en: String,
          es: String,
        },
      },
    },
    required: [true, PropertyPostsTranslations.PROPERTY_STATUS],
  })
  readonly status: IDefaultI18nName;

  @Prop({
    type: String,
    required: [true, PropertyPostsTranslations.PRIMARY_IMAGE],
  })
  readonly primaryImage: string;

  @Prop([
    {
      type: String,
      required: [true, PropertyPostsTranslations.SECONDARY_IMAGES],
    },
  ])
  readonly secondaryImages: string[];

  @Prop([
    {
      type: String,
    },
  ])
  readonly additionalInfo: string[];

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
    required: [true, PropertyPostsTranslations.ADDRESS],
  })
  readonly address: {
    formal?: IAddress;
    informal?: string;
  };
}

export const SchemaPropertyPost =
  SchemaFactory.createForClass(PropertyPostSchema);

SchemaPropertyPost.plugin(paginate);
