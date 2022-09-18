import { IsNotEmpty } from "@/common/infrastructure/decorators";
import {
  BaseValidationDto,
  NameTypeValidationDto,
} from "@/common/infrastructure/dtos";
import { FuelTranslations } from "@/vehicle-post/application/translations";
import { Type } from "class-transformer";
import { IsDefined, ValidateNested } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateFuelDto extends BaseValidationDto {
  @IsNotEmpty({ message: i18nValidationMessage(FuelTranslations.NAME) })
  @IsDefined({ message: i18nValidationMessage(FuelTranslations.NAME) })
  @ValidateNested()
  @Type(() => NameTypeValidationDto)
  readonly name: NameTypeValidationDto;
}
