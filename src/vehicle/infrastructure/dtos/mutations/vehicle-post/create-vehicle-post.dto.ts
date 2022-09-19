import {
  IsNotEmpty,
  MinLengthArray,
} from "../../../../../common/infrastructure/decorators";
import { i18nValidationMessage } from "nestjs-i18n";
import {
  IsArray,
  IsDefined,
  IsEnum,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { ElectricVehicleDto } from "./electric-vehicle.dto";
import { VehiclePostTranslations } from "@/vehicle/application/translations";
import {
  Fuel,
  Transmission,
  VehicleMake,
  VehicleStatus,
  VehicleType,
} from "@/vehicle/domain/types";
import { Color, Price } from "@/common/domain/types";

export class CreateVehiclePostDto {
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.DESCRIPTION),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.DESCRIPTION),
  })
  readonly description: string;

  @IsEnum(VehicleMake, {
    message: i18nValidationMessage(VehiclePostTranslations.INVALID_MAKE),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.MAKE),
  })
  @IsDefined({ message: i18nValidationMessage(VehiclePostTranslations.MAKE) })
  readonly make: VehicleMake;

  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.MODEL),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.MODEL),
  })
  readonly model: string;

  @IsEnum(VehicleType, {
    message: i18nValidationMessage(VehiclePostTranslations.INVALID_TYPE),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.TYPE),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.TYPE),
  })
  readonly type: VehicleType;

  @IsEnum(Transmission, {
    message: i18nValidationMessage(
      VehiclePostTranslations.INVALID_TRANSMISSION,
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.TRANSMISSION),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.TRANSMISSION),
  })
  readonly transmission: Transmission;

  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.PRICE),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.PRICE),
  })
  readonly price: Price;

  @IsEnum(Color, {
    message: i18nValidationMessage(
      VehiclePostTranslations.INVALID_EXTERIOR_COLOR,
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.EXTERIOR_COLOR),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.EXTERIOR_COLOR),
  })
  readonly exteriorColor: Color;

  @IsEnum(Color, {
    message: i18nValidationMessage(
      VehiclePostTranslations.INVALID_INTERIOR_COLOR,
    ),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.INTERIOR_COLOR),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.INTERIOR_COLOR),
  })
  readonly interiorColor: Color;

  readonly traction: string;

  readonly topSpeed: string;

  @IsEnum(Fuel, {
    message: i18nValidationMessage(VehiclePostTranslations.INVALID_FUEL_TYPE),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.FUEL_TYPE),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.FUEL_TYPE),
  })
  readonly fuelType: Fuel;

  @IsEnum(VehicleStatus, {
    message: i18nValidationMessage(VehiclePostTranslations.INVALID_STATUS),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.STATUS),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.STATUS),
  })
  readonly status: VehicleStatus;

  @ValidateNested()
  @ValidateIf((prop) => prop.fuelType === Fuel.ELECTRIC)
  readonly electric: ElectricVehicleDto;

  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.USE),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.USE),
  })
  @ValidateIf((prop) => prop.status === VehicleStatus.USED)
  readonly use: string;

  @MinLengthArray(1, { message: VehiclePostTranslations.ACCESSORIES_LENGTH })
  @IsArray({
    message: i18nValidationMessage(VehiclePostTranslations.ACCESSORIES_ARRAY),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.ACCESSORIES),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.ACCESSORIES),
  })
  readonly accessories: string[];

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
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.SECONDARY_IMAGES),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.SECONDARY_IMAGES),
  })
  @ValidateIf((prop) => !prop.isOptional)
  readonly secondaryImages: string[];

  readonly isOptional: boolean;
}
