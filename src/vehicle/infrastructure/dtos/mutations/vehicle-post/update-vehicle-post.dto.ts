import { IAddress, Price, SharedTranslations } from "@/common/domain/types";
import { VehiclePostTranslations } from "@/vehicle/application/translations";
import { VehicleStatus } from "@/vehicle/domain/types";
import { IsArray, IsMongoId } from "class-validator";
import { Types } from "mongoose";
import { i18nValidationMessage } from "nestjs-i18n";
import { ElectricVehicleDto } from "./electric-vehicle.dto";

export class UpdateVehiclePostDto {
  readonly description: string;

  @IsMongoId({ message: SharedTranslations.MONGO_ID })
  readonly make: Types.ObjectId;
  readonly model: string;

  @IsMongoId({ message: SharedTranslations.MONGO_ID })
  readonly type: Types.ObjectId;

  @IsMongoId({ message: SharedTranslations.MONGO_ID })
  readonly transmission: Types.ObjectId;
  readonly price: Price;
  readonly year: number;

  @IsMongoId({ message: SharedTranslations.MONGO_ID })
  readonly exteriorColor: Types.ObjectId;

  @IsMongoId({ message: SharedTranslations.MONGO_ID })
  readonly interiorColor: Types.ObjectId;

  @IsMongoId({ message: SharedTranslations.MONGO_ID })
  readonly traction: Types.ObjectId;
  readonly topSpeed: string;

  @IsMongoId({ message: SharedTranslations.MONGO_ID })
  readonly fuelType: Types.ObjectId;

  @IsMongoId({ message: SharedTranslations.MONGO_ID })
  readonly status: VehicleStatus;
  readonly electric: ElectricVehicleDto;

  readonly use: string;
  readonly cylinders: number;

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
