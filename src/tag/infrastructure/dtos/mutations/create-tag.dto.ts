import { IsNotEmpty } from "@/common/infrastructure/decorators";
import { TagTranslations } from "@/tag/application/translations";
import { IsDefined, MaxLength } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateTagDto {
  @IsNotEmpty({ message: i18nValidationMessage(TagTranslations.NAME) })
  @MaxLength(32, {
    message: i18nValidationMessage(TagTranslations.NAME_LENGTH),
  })
  @IsDefined({ message: i18nValidationMessage(TagTranslations.NAME) })
  readonly name: string;
}
