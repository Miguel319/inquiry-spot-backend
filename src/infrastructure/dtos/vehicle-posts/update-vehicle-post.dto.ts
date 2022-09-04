import {
  Color,
  Fuel,
  Transmission,
  VehicleMake,
  VehiclePostTranslations,
  VehicleStatus,
  VehicleType,
} from "../../../domain/types";
import { IsArray, IsEnum, ValidateIf, ValidateNested } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { ElectricVehicleDto } from "./electric-vehicle.dto";

export class UpdateVehiclePostDto {
  readonly description: string;

  @IsEnum(VehicleMake, {
    message: i18nValidationMessage(VehiclePostTranslations.INVALID_MAKE),
  })
  readonly make: VehicleMake;

  readonly model: string;

  @IsEnum(VehicleType, {
    message: i18nValidationMessage(VehiclePostTranslations.INVALID_TYPE),
  })
  readonly type: VehicleType;

  @IsEnum(Transmission, {
    message: i18nValidationMessage(
      VehiclePostTranslations.INVALID_TRANSMISSION,
    ),
  })
  readonly transmission: Transmission;

  readonly price: string;

  @IsEnum(Color, {
    message: i18nValidationMessage(
      VehiclePostTranslations.INVALID_EXTERIOR_COLOR,
    ),
  })
  readonly exteriorColor: Color;

  @IsEnum(Color, {
    message: i18nValidationMessage(
      VehiclePostTranslations.INVALID_INTERIOR_COLOR,
    ),
  })
  readonly interiorColor: Color;

  readonly traction: string;

  readonly topSpeed: string;

  @IsEnum(Fuel, {
    message: i18nValidationMessage(VehiclePostTranslations.INVALID_FUEL_TYPE),
  })
  readonly fuelType: Fuel;

  @IsEnum(VehicleStatus, {
    message: i18nValidationMessage(VehiclePostTranslations.INVALID_STATUS),
  })
  readonly status: VehicleStatus;

  @ValidateNested()
  @ValidateIf((prop) => prop.fuelType === Fuel.ELECTRIC)
  readonly electric: ElectricVehicleDto;

  @ValidateIf((prop) => prop.status === VehicleStatus.USED)
  readonly use: string;

  @IsArray({
    message: i18nValidationMessage(VehiclePostTranslations.ACCESSORIES_ARRAY),
  })
  readonly accessories: string[];

  readonly primaryImage: string;

  @IsArray({
    message: i18nValidationMessage(
      VehiclePostTranslations.SECONDARY_IMAGES_ARRAY,
    ),
  })
  readonly secondaryImages: string[];

  readonly isOptional: boolean;
}
