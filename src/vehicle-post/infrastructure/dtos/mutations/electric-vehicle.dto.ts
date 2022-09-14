import { IsNotEmpty } from "@/common/infrastructure/decorators";
import { VehiclePostTranslations } from "@/vehicle-post/application/translations";
import { ElectricValues } from "@/vehicle-post/domain/types";
import { IsDefined } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class ElectricVehicleDto implements ElectricValues {
  @IsNotEmpty({
    message: i18nValidationMessage(VehiclePostTranslations.ELECTRIC__RANGE),
  })
  @IsDefined({
    message: i18nValidationMessage(VehiclePostTranslations.ELECTRIC__RANGE),
  })
  readonly range: string;

  @IsNotEmpty({
    message: i18nValidationMessage(
      VehiclePostTranslations.ELECTRIC__CHARGING_TIME,
    ),
  })
  @IsDefined({
    message: i18nValidationMessage(
      VehiclePostTranslations.ELECTRIC__CHARGING_TIME,
    ),
  })
  readonly chargingTime: string;
}
