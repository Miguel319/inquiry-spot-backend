import { ElectricValues, VehiclePostTranslations } from "../../../domain/types";
import { IsNotEmpty } from "../../../common/infrastructure/decorators";
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
