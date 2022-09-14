import { TagTranslations } from "@/tag/application/translations";
import { MaxLength } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class UpdateTagDto {
  @MaxLength(32, {
    message: i18nValidationMessage(TagTranslations.NAME_LENGTH),
  })
  readonly name: string;
}
