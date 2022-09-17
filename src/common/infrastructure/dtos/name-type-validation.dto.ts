import { SharedTranslations } from "@/common/application/translations";
import { IsDefined } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { IsNotEmpty } from "../decorators";

export class NameTypeValidationDto {
  @IsNotEmpty({ message: i18nValidationMessage(SharedTranslations.NAME_EN) })
  @IsDefined({ message: i18nValidationMessage(SharedTranslations.NAME_EN) })
  readonly en: string;

  @IsNotEmpty({ message: i18nValidationMessage(SharedTranslations.NAME_ES) })
  @IsDefined({ message: i18nValidationMessage(SharedTranslations.NAME_ES) })
  readonly es: string;
}
