import { BlogTranslations } from "@/blog/application/translations";
import { MinLengthArray } from "@/common/infrastructure/decorators";
import { MinLength } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class UpdateBlogDto {
  readonly title: string;

  @MinLength(150, {
    message: i18nValidationMessage(BlogTranslations.BODY_MIN_LENGTH),
  })
  readonly body: string;

  readonly photo: string;

  @MinLengthArray(1, {
    message: i18nValidationMessage(BlogTranslations.TAGS_MIN_LENGTH),
  })
  readonly tags: Array<string>;

  readonly category: string;
}
