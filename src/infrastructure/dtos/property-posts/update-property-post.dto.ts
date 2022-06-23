import {
  BuyingOption,
  PropertyStatus,
  PropertyType,
} from "../../../domain/types";
import { IsArray, IsEnum, IsMongoId, IsNumber } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { AddresValidation } from "../common";

export class UpdatePropertyPostDto {
  readonly description: string;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage("validations.shared.number", {
        args: { field: i18nValidationMessage("general.bathroomCount") },
      }),
    },
  )
  readonly bathroomCount: number;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage("validations.shared.number", {
        args: { field: i18nValidationMessage("general.bedroomCount") },
      }),
    },
  )
  readonly bedroomCount: number;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage("validations.shared.number", {
        args: { field: i18nValidationMessage("general.parkingLotCount") },
      }),
    },
  )
  readonly parkingLotCount: number;

  readonly price: number;

  @IsMongoId({ message: i18nValidationMessage("validations.shared.mongoId") })
  readonly seller: string;

  @IsNumber({}, { message: i18nValidationMessage("validations.shared.number") })
  readonly territory: number;

  @IsEnum(BuyingOption, {
    message: i18nValidationMessage(
      "validations.propertyPost.invalidBuyingOption",
    ),
  })
  readonly buyingOptions: BuyingOption;

  @IsEnum(PropertyType, {
    message: i18nValidationMessage(
      "validations.propertyPost.invalidPropertyType",
    ),
  })
  readonly propertyType: PropertyType;

  @IsEnum(PropertyStatus, {
    message: i18nValidationMessage(
      "validations.propertyPost.invalidPropertyStatus",
    ),
  })
  readonly propertyStatus: PropertyStatus;

  readonly primaryImage: string;

  @IsArray({
    message: i18nValidationMessage("validations.shared.array", {
      args: {
        field: i18nValidationMessage("general.secondaryImages"),
      },
    }),
  })
  readonly secondaryImages: string[];

  @IsArray({
    message: i18nValidationMessage("validations.shared.array", {
      args: {
        field: i18nValidationMessage("general.additionalInfo"),
      },
    }),
  })
  readonly additionalInfo: string[];

  readonly address: AddresValidation;
}
