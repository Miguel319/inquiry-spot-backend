import {
  BuyingOption,
  PropertyPostsTranslations,
  PropertyStatus,
  PropertyType,
} from "../../../domain/types";
import { IsNotEmpty } from "../../../infrastructure/common/decorators";
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsInt,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { AddresValidation } from "../common";

export class CreatePropertyPostDto {
  @IsNotEmpty({
    message: i18nValidationMessage(PropertyPostsTranslations.DESCRIPTION),
  })
  @IsDefined({
    message: i18nValidationMessage(PropertyPostsTranslations.DESCRIPTION),
  })
  readonly description: string;

  @IsInt({
    message: i18nValidationMessage(
      PropertyPostsTranslations.BATHROOM_COUNT_INT,
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(PropertyPostsTranslations.BATHROOM_COUNT),
  })
  @IsDefined({
    message: i18nValidationMessage(PropertyPostsTranslations.BATHROOM_COUNT),
  })
  readonly bathroomCount: number;

  @IsInt({
    message: i18nValidationMessage(PropertyPostsTranslations.BEDROOM_COUNT_INT),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(PropertyPostsTranslations.BEDROOM_COUNT),
  })
  @IsDefined({
    message: i18nValidationMessage(PropertyPostsTranslations.BEDROOM_COUNT),
  })
  readonly bedroomCount: number;

  @IsInt({
    message: i18nValidationMessage(
      PropertyPostsTranslations.PARKING_LOT_COUNT_INT,
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(PropertyPostsTranslations.PARKING_LOT_COUNT),
  })
  @IsDefined({
    message: i18nValidationMessage(PropertyPostsTranslations.PARKING_LOT_COUNT),
  })
  readonly parkingLotCount: number;

  @IsNotEmpty({
    message: i18nValidationMessage(PropertyPostsTranslations.PRICE),
  })
  @IsDefined({
    message: i18nValidationMessage(PropertyPostsTranslations.PRICE),
  })
  readonly price: number;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage(
        PropertyPostsTranslations.TERRITORY_NUMBER,
      ),
    },
  )
  readonly territory: number;

  @IsEnum(BuyingOption, {
    message: i18nValidationMessage(
      PropertyPostsTranslations.INVALID_BUYING_OPTION,
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(PropertyPostsTranslations.BUYING_OPTION),
  })
  @IsDefined({
    message: i18nValidationMessage(PropertyPostsTranslations.BUYING_OPTION),
  })
  readonly buyingOption: BuyingOption;

  @IsEnum(PropertyType, {
    message: i18nValidationMessage(
      PropertyPostsTranslations.INVALID_PROPERTY_TYPE,
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(PropertyPostsTranslations.PROPERTY_TYPE),
  })
  @IsDefined({
    message: i18nValidationMessage(PropertyPostsTranslations.PROPERTY_TYPE),
  })
  readonly propertyType: PropertyType;

  @IsEnum(PropertyStatus, {
    message: i18nValidationMessage(
      PropertyPostsTranslations.INVALID_PROPERTY_STATUS,
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(PropertyPostsTranslations.PROPERTY_STATUS),
  })
  @IsDefined({
    message: i18nValidationMessage(PropertyPostsTranslations.PROPERTY_STATUS),
  })
  readonly propertyStatus: PropertyStatus;

  @IsNotEmpty({
    message: i18nValidationMessage(PropertyPostsTranslations.PRIMARY_IMAGE),
  })
  @IsDefined({
    message: i18nValidationMessage(PropertyPostsTranslations.PRIMARY_IMAGE),
  })
  readonly primaryImage: string;

  @IsArray({
    message: i18nValidationMessage(
      PropertyPostsTranslations.SECONDARY_IMAGES_ARRAY,
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(PropertyPostsTranslations.SECONDARY_IMAGES),
  })
  @IsDefined({
    message: i18nValidationMessage(PropertyPostsTranslations.SECONDARY_IMAGES),
  })
  readonly secondaryImages: string[];

  @IsArray({
    message: i18nValidationMessage(
      PropertyPostsTranslations.ADDITIONAL_INFO_ARRAY,
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(PropertyPostsTranslations.ADDITIONAL_INFO),
  })
  @IsDefined({
    message: i18nValidationMessage(PropertyPostsTranslations.ADDITIONAL_INFO),
  })
  readonly additionalInfo: string[];

  @ValidateNested()
  readonly address: AddresValidation;
}
