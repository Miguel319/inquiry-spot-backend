import {
  IsNotEmpty,
  MinLengthArray,
} from "../../../../../common/infrastructure/decorators";
import { i18nValidationMessage } from "nestjs-i18n";
import {
  IsArray,
  IsDefined,
  IsNumber,
  Min,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { ElectricVehicleDto } from "./electric-vehicle.dto";
import { VehiclePostTranslations } from "@/vehicle/application/translations";
import { Fuel, VehicleStatus } from "@/vehicle/domain/types";
import { IAddress, Price, SharedTranslations } from "@/common/domain/types";
import { AddressValidationDto } from "@/common/infrastructure/dtos";
import { Type } from "class-transformer";
import { Types } from "mongoose";

export class CreateVehiclePostDto {
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.DESCRIPTION),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.DESCRIPTION),
  })
  readonly description: string;

  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.MAKE),
  })
  @IsDefined({ message: i18nValidationMessage(VehiclePostTranslations.MAKE) })
  readonly make: Types.ObjectId;

  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.YEAR),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.YEAR),
  })
  readonly year: number;

  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.MODEL),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.MODEL),
  })
  readonly model: string;

  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.TYPE),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.TYPE),
  })
  readonly type: Types.ObjectId;

  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.TRANSMISSION),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.TRANSMISSION),
  })
  readonly transmission: Types.ObjectId;

  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.PRICE),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.PRICE),
  })
  readonly price: Price;

  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.EXTERIOR_COLOR),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.EXTERIOR_COLOR),
  })
  readonly exteriorColor: Types.ObjectId;

  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.INTERIOR_COLOR),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.INTERIOR_COLOR),
  })
  readonly interiorColor: Types.ObjectId;

  readonly traction: Types.ObjectId;

  readonly topSpeed: string;

  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.FUEL_TYPE),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.FUEL_TYPE),
  })
  readonly fuelType: Types.ObjectId;

  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.STATUS),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.STATUS),
  })
  readonly status: Types.ObjectId;

  @ValidateNested()
  @Type(() => ElectricVehicleDto)
  @ValidateIf((prop) => prop.fuelType === Fuel.ELECTRIC)
  readonly electric: ElectricVehicleDto;

  seller: {
    _id: Types.ObjectId;
    value: string;
  };

  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.USE),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.USE),
  })
  @ValidateIf((prop) => prop.status === VehicleStatus.USED)
  readonly use: string;

  @IsNumber({}, { message: i18nValidationMessage(SharedTranslations.NUMBER) })
  readonly cylinders: number;

  @Min(1, {
    message: i18nValidationMessage(VehiclePostTranslations.DOOR_COUNT_MIN),
  })
  @IsNumber({}, { message: i18nValidationMessage(SharedTranslations.NUMBER) })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.DOOR_COUNT),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.DOOR_COUNT),
  })
  readonly doorCount: number;

  @MinLengthArray(1, { message: VehiclePostTranslations.ACCESSORIES_LENGTH })
  @IsArray({
    message: i18nValidationMessage(VehiclePostTranslations.ACCESSORIES_ARRAY),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.ACCESSORIES),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.ACCESSORIES),
  })
  readonly accessories: string[];

  readonly isFormalAddress: boolean;

  @ValidateNested()
  @Type(() => AddressValidationDto)
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.FORMAL_ADDRESS),
  })
  @ValidateIf((prop) => prop.isFormalAddress)
  readonly formalAddress: IAddress;

  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.FORMAL_ADDRESS),
  })
  @ValidateIf((prop) => !prop.isFormalAddress)
  readonly informalAddress: string;

  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.PRIMARY_IMAGE),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.PRIMARY_IMAGE),
  })
  @ValidateIf((prop) => !prop.isOptional)
  readonly primaryImage: string;

  @MinLengthArray(1, {
    message: i18nValidationMessage(
      VehiclePostTranslations.SECONDARY_IMAGES_LENGTH,
    ),
  })
  @IsArray({
    message: i18nValidationMessage(
      VehiclePostTranslations.SECONDARY_IMAGES_ARRAY,
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.SECONDARY_IMAGES),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.SECONDARY_IMAGES),
  })
  @ValidateIf((prop) => !prop.isOptional)
  readonly secondaryImages: string[];

  readonly isOptional: boolean;
}
