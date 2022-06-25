import {
  Color,
  Fuel,
  Transmission,
  VehicleMake,
  VehicleStatus,
  VehicleType,
} from "../../../domain/types";
import { IsNotEmpty } from "../../../infrastructure/common/decorators";
import { i18nValidationMessage } from "nestjs-i18n";
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsMongoId,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { ElectricVehicleDto } from "./electric-vehicle.dto";

export class CreateVehiclePostDto {
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.description"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.description"),
  })
  readonly description: string;

  @IsEnum(VehicleMake, {
    message: i18nValidationMessage("validations.vehiclePost.invalidMake"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.make"),
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

  @IsEnum(VehicleType, {
    message: i18nValidationMessage("validations.vehiclePost.invalidType"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.type"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.type"),
  })
  readonly type: VehicleType;

  @IsEnum(Transmission, {
    message: i18nValidationMessage(
      "validations.vehiclePost.invalidTransmission",
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.transmission"),
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

  @IsEnum(Color, {
    message: i18nValidationMessage(
      "validations.vehiclePost.invalidExteriorColor",
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.exteriorColor"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.exteriorColor"),
  })
  readonly exteriorColor: Color;

  @IsEnum(Color, {
    message: i18nValidationMessage(
      "validations.vehiclePost.invalidInteriorColor",
    ),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.interiorColor"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.interiorColor"),
  })
  readonly interiorColor: Color;

  readonly traction: string;

  readonly topSpeed: string;

  @IsEnum(Fuel, {
    message: i18nValidationMessage("validations.vehiclePost.invalidFuelType"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.fuelType"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.fuelType"),
  })
  readonly fuelType: Fuel;

  @IsEnum(VehicleStatus, {
    message: i18nValidationMessage("validations.vehiclePost.invalidStatus"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.status"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.status"),
  })
  readonly status: VehicleStatus;

  @ValidateNested()
  @ValidateIf((prop) => prop.fuelType === Fuel.ELECTRIC)
  readonly electric: ElectricVehicleDto;

  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.use"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.invalidUse"),
  })
  @ValidateIf((prop) => prop.status === VehicleStatus.USED)
  readonly use: string;

  @IsMongoId({
    message: i18nValidationMessage("validations.propertyPost.sellerMongoId"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.propertyPost.seller"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.propertyPost.seller"),
  })
  readonly seller: string;

  @IsArray({
    message: i18nValidationMessage("validations.vehiclePost.accessoriesArray"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.accessories"),
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

  @IsArray({
    message: i18nValidationMessage(
      "validations.vehiclePost.secondaryImagesArray",
    ),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.secondaryImages"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.secondaryImages"),
  })
  readonly secondaryImages: string[];
}
