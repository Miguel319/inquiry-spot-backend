import {
  Color,
  ElectricValues,
  Fuel,
  Transmission,
  VehicleType,
} from "../../../domain/types";
import { IsArray, IsEnum } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class UpdateVehiclePostDto {
  readonly description: string;

  @IsEnum(VehicleType, {
    message: i18nValidationMessage("validations.vehiclePost.invalidMake"),
  })
  readonly make: string;

  readonly model: string;

  @IsEnum(VehicleType, {
    message: i18nValidationMessage("validations.vehiclePost.invalidType"),
  })
  readonly type: VehicleType;

  @IsEnum(VehicleType, {
    message: i18nValidationMessage(
      "validations.vehiclePost.invalidTransmission",
    ),
  })
  readonly transmission: Transmission;

  readonly price: string;

  @IsEnum(Color, {
    message: i18nValidationMessage(
      "validations.vehiclePost.invalidExteriorColor",
    ),
  })
  readonly exteriorColor: Color;

  @IsEnum(Color, {
    message: i18nValidationMessage(
      "validations.vehiclePost.invalidInteriorColor",
    ),
  })
  readonly interiorColor: Color;

  readonly traction: string;

  readonly topSpeed: string;

  @IsEnum(Fuel, {
    message: i18nValidationMessage("validations.vehiclePost.invalidFuelType"),
  })
  readonly fuelType: Fuel;

  readonly electric: ElectricValues;

  readonly use: string;

  @IsArray({
    message: i18nValidationMessage("validations.shared.isArray", {
      field: i18nValidationMessage("general.accessories"),
    }),
  })
  readonly accessories: string[];

  readonly primaryImage: string;

  @IsArray({
    message: i18nValidationMessage("validations.shared.isArray", {
      field: i18nValidationMessage("general.accessories"),
    }),
  })
  readonly secondaryImages: string[];
}
