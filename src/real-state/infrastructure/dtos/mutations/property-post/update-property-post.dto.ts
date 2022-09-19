import { AddressValidationDto } from "@/common/infrastructure/dtos";
import { PropertyPostsTranslations } from "@/real-state/application/translations";
import {
  BuyingOption,
  PropertyStatus,
  PropertyType,
} from "@/real-state/domain";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class UpdatePropertyPostDto {
  readonly description: string;

  @IsInt({
    message: i18nValidationMessage(
      PropertyPostsTranslations.BATHROOM_COUNT_INT,
    ),
  })
  readonly bathroomCount: number;

  @IsInt({
    message: i18nValidationMessage(PropertyPostsTranslations.BEDROOM_COUNT_INT),
  })
  readonly bedroomCount: number;

  @IsInt({
    message: i18nValidationMessage(
      PropertyPostsTranslations.PARKING_LOT_COUNT_INT,
    ),
  })
  readonly parkingLotCount: number;

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
  readonly buyingOption: BuyingOption;

  @IsEnum(PropertyType, {
    message: i18nValidationMessage(
      PropertyPostsTranslations.INVALID_PROPERTY_TYPE,
    ),
  })
  readonly propertyType: PropertyType;

  @IsEnum(PropertyStatus, {
    message: i18nValidationMessage(
      PropertyPostsTranslations.INVALID_PROPERTY_STATUS,
    ),
  })
  readonly propertyStatus: PropertyStatus;

  readonly primaryImage: string;

  @IsArray({
    message: i18nValidationMessage(
      PropertyPostsTranslations.SECONDARY_IMAGES_ARRAY,
    ),
  })
  readonly secondaryImages: string[];

  @IsArray({
    message: i18nValidationMessage(
      PropertyPostsTranslations.ADDITIONAL_INFO_ARRAY,
    ),
  })
  readonly additionalInfo: string[];

  @ValidateNested()
  readonly address: AddressValidationDto;
}
