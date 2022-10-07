import { IsNotEmpty } from "@/common/infrastructure/decorators";
import { NameTypeValidationDto } from "@/common/infrastructure/dtos";
import { ColorTranslations } from "@/common/application/translations";
import { Type } from "class-transformer";

import { IsDefined, ValidateNested } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateColorDto {
  @IsNotEmpty({
    message: i18nValidationMessage(ColorTranslations.NAME),
  })
  @IsDefined({ message: i18nValidationMessage(ColorTranslations.NAME) })
  @ValidateNested()
  @Type(() => NameTypeValidationDto)
  readonly name: NameTypeValidationDto;

  @IsNotEmpty({
    message: i18nValidationMessage(ColorTranslations.HEX_VALUE),
  })
  @IsDefined({ message: i18nValidationMessage(ColorTranslations.HEX_VALUE) })
  readonly hexValue: string;
}
