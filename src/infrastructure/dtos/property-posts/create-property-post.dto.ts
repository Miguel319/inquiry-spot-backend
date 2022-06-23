import {
  BuyingOption,
  PropertyStatus,
  PropertyType,
} from "../../../domain/types";
import { IsNotEmpty } from "../../../infrastructure/common/decorators";
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { AddresValidation } from "../common";

export class CreatePropertyPostDto {
  @IsNotEmpty({
    message: i18nValidationMessage("validations.propertyPost.description"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.propertyPost.description"),
  })
  readonly description: string;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage("validations.shared.number", {
        args: { field: i18nValidationMessage("general.bathroomCount") },
      }),
    },
  )
  @IsNotEmpty({
    message: i18nValidationMessage("validations.propertyPost.bathroomCount"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.propertyPost.bathroomCount"),
  })
  readonly bathroomCount: number;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage("validations.shared.number", {
        args: { field: i18nValidationMessage("general.bedroomCount") },
      }),
    },
  )
  @IsNotEmpty({
    message: i18nValidationMessage("validations.propertyPost.bedroomCount"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.propertyPost.bedroomCount"),
  })
  readonly bedroomCount: number;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage("validations.shared.number", {
        args: { field: i18nValidationMessage("general.parkingLotCount") },
      }),
    },
  )
  @IsNotEmpty({
    message: i18nValidationMessage("validations.propertyPost.parkingLotCount"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.propertyPost.parkingLotCount"),
  })
  readonly parkingLotCount: number;

  @IsNotEmpty({
    message: i18nValidationMessage("validations.propertyPost.price"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.propertyPost.price"),
  })
  readonly price: number;

  @IsMongoId({ message: i18nValidationMessage("validations.shared.mongoId") })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.propertyPost.seller"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.propertyPost.seller"),
  })
  readonly seller: string;

  @IsNumber({}, { message: i18nValidationMessage("validations.shared.number") })
  readonly territory: number;

  @IsEnum(BuyingOption, {
    message: i18nValidationMessage(
      "validations.propertyPost.invalidBuyingOption",
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.propertyPost.buyingOption"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.propertyPost.buyingOption"),
  })
  readonly buyingOption: BuyingOption;

  @IsEnum(PropertyType, {
    message: i18nValidationMessage(
      "validations.propertyPost.invalidPropertyType",
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.propertyPost.propertyType"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.propertyPost.propertyType"),
  })
  readonly propertyType: PropertyType;

  @IsEnum(PropertyStatus, {
    message: i18nValidationMessage(
      "validations.propertyPost.invalidPropertyStatus",
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.propertyPost.propertyStatus"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.propertyPost.propertyStatus"),
  })
  readonly propertyStatus: PropertyStatus;

  @IsNotEmpty({
    message: i18nValidationMessage("validations.propertyPost.primaryImage"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.propertyPost.secondaryImages"),
  })
  readonly primaryImage: string;

  @IsArray({
    message: i18nValidationMessage("validations.shared.array", {
      args: {
        field: i18nValidationMessage("general.secondaryImages"),
      },
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.propertyPost.secondaryImages"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.propertyPost.secondaryImages"),
  })
  readonly secondaryImages: string[];

  @IsArray({
    message: i18nValidationMessage("validations.shared.array", {
      args: {
        field: i18nValidationMessage("general.additionalInfo"),
      },
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.propertyPost.additionalInfo"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.propertyPost.additionalInfo"),
  })
  readonly additionalInfo: string[];

  @ValidateNested()
  readonly address: AddresValidation;
}
