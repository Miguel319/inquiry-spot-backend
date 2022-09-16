import { IsNotEmpty } from "@/common/infrastructure/decorators";
import { BaseValidationDto } from "@/common/infrastructure/dtos";
import { VehicleTypeTranslations } from "@/vehicle-post/application/translations";
import { IsDefined } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateVehicleTypeDto extends BaseValidationDto {
  @IsNotEmpty({
    message: i18nValidationMessage(VehicleTypeTranslations.NAME),
  })
  @IsDefined({
    message: i18nValidationMessage(VehicleTypeTranslations.NAME),
  })
  readonly name: string;
}
