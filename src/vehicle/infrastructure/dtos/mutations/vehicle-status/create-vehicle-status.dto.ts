import { IsNotEmpty } from "@/common/infrastructure/decorators";
import {
  BaseValidationDto,
  NameTypeValidationDto,
} from "@/common/infrastructure/dtos";
import { VehicleStatusTranslations } from "@/vehicle/application/translations";
import { Type } from "class-transformer";

import { IsDefined, ValidateNested } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateVehicleStatusDto extends BaseValidationDto {
  @IsNotEmpty({
    message: i18nValidationMessage(VehicleStatusTranslations.NAME),
  })
  @IsDefined({ message: i18nValidationMessage(VehicleStatusTranslations.NAME) })
  @ValidateNested()
  @Type(() => NameTypeValidationDto)
  readonly name: NameTypeValidationDto;
}
