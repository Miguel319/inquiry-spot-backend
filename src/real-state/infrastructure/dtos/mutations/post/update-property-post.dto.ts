import { Price } from "@/common/domain/types";
import { AddressValidationDto } from "@/common/infrastructure/dtos";
import { PropertyPostsTranslations } from "@/real-state/application/translations";
import { IsArray, IsInt, ValidateNested } from "class-validator";
import { Types } from "mongoose";
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
  readonly price: Price;
  readonly landSize: string;
  readonly buyingOption: Types.ObjectId;
  readonly type: Types.ObjectId;
  readonly status: Types.ObjectId;
  readonly primaryImage: string;

  @IsInt({
    message: i18nValidationMessage(
      PropertyPostsTranslations.YEAR_OF_CONSTRUCTION_INT,
    ),
  })
  readonly yearOfConstruction: number;

  @IsArray({
    message: i18nValidationMessage(
      PropertyPostsTranslations.SECONDARY_IMAGES_ARRAY,
    ),
  })
  readonly secondaryImages: string[];
  readonly exteriorColor: Types.ObjectId;
  readonly interiorColor: Types.ObjectId;

  @IsArray({
    message: i18nValidationMessage(
      PropertyPostsTranslations.ADDITIONAL_INFO_ARRAY,
    ),
  })
  readonly additionalInfo: string[];

  readonly isFormalAddress: boolean;

  seller: {
    _id: Types.ObjectId;
    value: string;
  };

  @ValidateNested()
  readonly formalAddress: AddressValidationDto;

  readonly informalAddress: string;
}
