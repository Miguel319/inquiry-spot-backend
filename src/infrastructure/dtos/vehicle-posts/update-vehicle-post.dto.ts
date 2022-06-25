import {
  Color,
  Fuel,
  Transmission,
  VehicleMake,
  VehicleStatus,
  VehicleType,
} from "../../../domain/types";
import {
  IsArray,
  IsEnum,
  IsMongoId,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { ElectricVehicleDto } from "./electric-vehicle.dto";

export class UpdateVehiclePostDto {
  readonly description: string;

  @IsEnum(VehicleMake, {
    message: i18nValidationMessage("validations.vehiclePost.invalidMake"),
  })
  readonly make: VehicleMake;

  readonly model: string;

  @IsEnum(VehicleType, {
    message: i18nValidationMessage("validations.vehiclePost.invalidType"),
  })
  readonly type: VehicleType;

  @IsEnum(Transmission, {
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

  @IsEnum(Fuel, {
    message: i18nValidationMessage("validations.vehiclePost.invalidStatus"),
  })
  readonly status: VehicleStatus;

  @ValidateNested()
  @ValidateIf((prop) => prop.fuelType === Fuel.ELECTRIC)
  readonly electric: ElectricVehicleDto;

  @ValidateIf((prop) => prop.status === VehicleStatus.USED)
  readonly use: string;

  @IsMongoId({
    message: i18nValidationMessage("validations.propertyPost.sellerMongoId"),
  })
  readonly seller: string;

  @IsArray({
    message: i18nValidationMessage("validations.vehiclePost.accessoriesArray"),
  })
  readonly accessories: string[];

  readonly primaryImage: string;

  @IsArray({
    message: i18nValidationMessage(
      "validations.vehiclePost.secondaryImagesArray",
    ),
  })
  readonly secondaryImages: string[];
}
