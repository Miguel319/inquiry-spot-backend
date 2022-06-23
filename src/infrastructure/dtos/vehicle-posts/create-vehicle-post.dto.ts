import {
  Color,
  ElectricValues,
  Fuel,
  Transmission,
  VehicleMake,
  VehicleType,
} from "../../../domain/types";
import { IsNotEmpty } from "../../../infrastructure/common/decorators";
import { i18nValidationMessage } from "nestjs-i18n";
import { IsArray, IsDefined, IsEnum } from "class-validator";

export class CreateVehiclePostDto {
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.description"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.description"),
  })
  readonly description: string;

  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.make"),
  })
  @IsEnum(VehicleMake, {
    message: i18nValidationMessage("validations.vehiclePost.invalidMake"),
  })
  @IsDefined({ message: i18nValidationMessage("validations.vehiclePost.make") })
  readonly make: VehicleMake;

  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.model"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.model"),
  })
  readonly model: string;

  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.type"),
  })
  @IsEnum(VehicleType, {
    message: i18nValidationMessage("validations.vehiclePost.invalidType"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.type"),
  })
  readonly type: VehicleType;

  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.transmission"),
  })
  @IsEnum(Transmission, {
    message: i18nValidationMessage(
      "validations.vehiclePost.invalidTransmission",
    ),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.transmission"),
  })
  readonly transmission: Transmission;

  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.price"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.price"),
  })
  readonly price: string;

  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.exteriorColor"),
  })
  @IsEnum(Color, {
    message: i18nValidationMessage(
      "validations.vehiclePost.invalidExteriorColor",
    ),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.exteriorColor"),
  })
  readonly exteriorColor: Color;

  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.interiorColor"),
  })
  @IsEnum(Color, {
    message: i18nValidationMessage(
      "validations.vehiclePost.invalidInteriorColor",
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.interiorColor"),
  })
  readonly interiorColor: Color;

  readonly traction: string;

  readonly topSpeed: string;

  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.fuelType"),
  })
  @IsEnum(Fuel, {
    message: i18nValidationMessage("validations.vehiclePost.invalidFuelType"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.fuelType"),
  })
  readonly fuelType: Fuel;

  readonly electric: ElectricValues;

  readonly use: string;

  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.accessories"),
  })
  @IsArray({
    message: i18nValidationMessage("validations.shared.array", {
      args: {
        field: i18nValidationMessage("general.accessories"),
      },
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.accessories"),
  })
  readonly accessories: string[];

  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.primaryImage"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.primaryImage"),
  })
  readonly primaryImage: string;

  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.secondaryImages"),
  })
  @IsArray({
    message: i18nValidationMessage("validations.shared.array", {
      args: {
        field: i18nValidationMessage("general.accessories"),
      },
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.secondaryImages"),
  })
  readonly secondaryImages: string[];
}
