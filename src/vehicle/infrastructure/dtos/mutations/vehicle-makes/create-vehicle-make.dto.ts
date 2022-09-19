import { IsNotEmpty } from "@/common/infrastructure/decorators";
import { BaseValidationDto } from "@/common/infrastructure/dtos";
import { VehicleMakeTranslations } from "@/vehicle/application/translations";
import { IsDefined } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateVehicleMakeDto extends BaseValidationDto {
  @IsNotEmpty({ message: i18nValidationMessage(VehicleMakeTranslations.NAME) })
  @IsDefined({ message: i18nValidationMessage(VehicleMakeTranslations.NAME) })
  readonly name: string;
}
