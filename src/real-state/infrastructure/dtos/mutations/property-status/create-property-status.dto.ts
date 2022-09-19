import { IsNotEmpty } from "@/common/infrastructure/decorators";
import {
  BaseValidationDto,
  NameTypeValidationDto,
} from "@/common/infrastructure/dtos";
import { PropertyStatusTranslations } from "@/real-state/application/translations";
import { Type } from "class-transformer";
import { IsDefined, ValidateNested } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreatePropertyStatusDto extends BaseValidationDto {
  @IsNotEmpty({
    message: i18nValidationMessage(PropertyStatusTranslations.NAME),
  })
  @IsDefined({
    message: i18nValidationMessage(PropertyStatusTranslations.NAME),
  })
  @ValidateNested()
  @Type(() => NameTypeValidationDto)
  readonly name: NameTypeValidationDto;
}
