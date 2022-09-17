import { IsNotEmpty } from "@/common/infrastructure/decorators";
import {
  BaseValidationDto,
  NameTypeValidationDto,
} from "@/common/infrastructure/dtos";
import { VehicleMakeTranslations } from "@/vehicle-post/application/translations";
import { Type } from "class-transformer";
import { IsDefined, ValidateNested } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateVehicleMakeDto extends BaseValidationDto {
  @ValidateNested()
  @Type(() => NameTypeValidationDto)
  @IsNotEmpty({ message: i18nValidationMessage(VehicleMakeTranslations.NAME) })
  @IsDefined({ message: i18nValidationMessage(VehicleMakeTranslations.NAME) })
  readonly name: NameTypeValidationDto;
}
