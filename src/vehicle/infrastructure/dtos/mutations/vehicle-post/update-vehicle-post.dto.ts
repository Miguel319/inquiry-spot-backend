import { IAddress, Price, SharedTranslations } from "@/common/domain/types";
import { VehiclePostTranslations } from "@/vehicle/application/translations";
import { IsArray, IsNumber, Min } from "class-validator";
import { Types } from "mongoose";
import { i18nValidationMessage } from "nestjs-i18n";
import { ElectricVehicleDto } from "./electric-vehicle.dto";

export class UpdateVehiclePostDto {
  readonly description: string;

  readonly make: Types.ObjectId;
  readonly model: string;

  readonly type: Types.ObjectId;

  readonly transmission: Types.ObjectId;
  readonly price: Price;
  readonly year: number;

  readonly exteriorColor: Types.ObjectId;

  readonly interiorColor: Types.ObjectId;

  readonly traction: Types.ObjectId;
  readonly topSpeed: string;

  readonly fuelType: Types.ObjectId;

  readonly status: Types.ObjectId;
  readonly electric: ElectricVehicleDto;

  readonly use: string;

  seller: {
    _id: Types.ObjectId;
    value: string;
  };

  readonly cylinders: number;

  @Min(1, {
    message: i18nValidationMessage(VehiclePostTranslations.DOOR_COUNT_MIN),
  })
  @IsNumber({}, { message: i18nValidationMessage(SharedTranslations.NUMBER) })
  readonly doorCount: number;

  @IsArray({
    message: i18nValidationMessage(VehiclePostTranslations.ACCESSORIES_ARRAY),
  })
  readonly accessories: string[];
  readonly isFormalAddress: boolean;
  readonly formalAddress: IAddress;
  readonly informalAddress: string;
  readonly primaryImage: string;
  @IsArray({
    message: i18nValidationMessage(
      VehiclePostTranslations.SECONDARY_IMAGES_ARRAY,
    ),
  })
  readonly secondaryImages: string[];
  readonly isOptional: boolean;
}
