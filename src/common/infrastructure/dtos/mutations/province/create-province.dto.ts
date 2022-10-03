import { IsNotEmpty } from "@/common/infrastructure/decorators";
import { NameTypeValidationDto } from "@/common/infrastructure/dtos";
import { ProvinceTranslations } from "@/common/application/translations";

import { IsDefined } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateProvinceDto {
  @IsNotEmpty({ message: i18nValidationMessage(ProvinceTranslations.NAME) })
  @IsDefined({ message: i18nValidationMessage(ProvinceTranslations.NAME) })
  readonly name: NameTypeValidationDto;
}
