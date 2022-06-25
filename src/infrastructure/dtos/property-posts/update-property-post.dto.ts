import {
  BuyingOption,
  PropertyStatus,
  PropertyType,
} from "../../../domain/types";
import { IsArray, IsEnum, IsInt, IsMongoId, IsNumber } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { AddresValidation } from "../common";

export class UpdatePropertyPostDto {
  readonly description: string;

  @IsInt({
    message: i18nValidationMessage("validations.propertyPost.bathroomCountInt"),
  })
  readonly bathroomCount: number;

  @IsInt({
    message: i18nValidationMessage("validations.propertyPost.bedroomCountInt"),
  })
  readonly bedroomCount: number;

  @IsInt({
    message: i18nValidationMessage(
      "validations.propertyPost.parkingLotCountInt",
    ),
  })
  readonly parkingLotCount: number;

  readonly price: number;

  @IsMongoId({
    message: i18nValidationMessage("validations.propertyPost.sellerMongoId"),
  })
  readonly seller: string;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage(
        "validations.propertyPost.territoryNumber",
      ),
    },
  )
  readonly territory: number;

  @IsEnum(BuyingOption, {
    message: i18nValidationMessage(
      "validations.propertyPost.invalidBuyingOption",
    ),
  })
  readonly buyingOption: BuyingOption;

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
    message: i18nValidationMessage(
      "validations.propertyPost.secondaryImagesArray",
    ),
  })
  readonly secondaryImages: string[];

  @IsArray({
    message: i18nValidationMessage(
      "validations.propertyPost.additionalInfoArray",
    ),
  })
  readonly additionalInfo: string[];

  readonly address: AddresValidation;
}
