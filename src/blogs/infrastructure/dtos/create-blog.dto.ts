import { IsNotEmpty, MinLengthArray } from "@/common/infrastructure/decorators";
import { BlogTranslations } from "@/domain/types/common/translations";
import { IsDefined, MinLength } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateBlogDto {
  @IsNotEmpty({
    message: i18nValidationMessage(BlogTranslations.REQUIRED_TITLE),
  })
  @IsDefined({
    message: i18nValidationMessage(BlogTranslations.REQUIRED_TITLE),
  })
  readonly title: string;

  @MinLength(150, {
    message: i18nValidationMessage(BlogTranslations.BODY_MIN_LENGTH),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(BlogTranslations.REQUIRED_BODY),
  })
  @IsDefined({
    message: i18nValidationMessage(BlogTranslations.REQUIRED_BODY),
  })
  readonly body: string;

  @IsNotEmpty({
    message: i18nValidationMessage(BlogTranslations.REQUIRED_PHOTO),
  })
  @IsDefined({
    message: i18nValidationMessage(BlogTranslations.REQUIRED_PHOTO),
  })
  readonly photo: string;

  @MinLengthArray(1, {
    message: i18nValidationMessage(BlogTranslations.TAGS_MIN_LENGTH),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(BlogTranslations.REQUIRED_TAGS),
  })
  @IsDefined({
    message: i18nValidationMessage(BlogTranslations.REQUIRED_TAGS),
  })
  readonly tags: Array<string>;

  @IsNotEmpty({
    message: i18nValidationMessage(BlogTranslations.REQUIRED_CATEGORY),
  })
  @IsDefined({
    message: i18nValidationMessage(BlogTranslations.REQUIRED_CATEGORY),
  })
  readonly category: string;
}
