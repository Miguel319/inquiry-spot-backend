import { ElectricValues } from "../../../domain/types";
import { IsNotEmpty } from "../../../infrastructure/common/decorators";
import { IsDefined } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class ElectricVehicleDto implements ElectricValues {
  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.electric.range"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.electric.range"),
  })
  readonly range: string;

  @IsNotEmpty({
    message: i18nValidationMessage(
      "validations.vehiclePost.electric.chargingTime",
    ),
  })
  @IsDefined({
    message: i18nValidationMessage(
      "validations.vehiclePost.electric.chargingTime",
    ),
  })
  readonly chargingTime: string;
}
