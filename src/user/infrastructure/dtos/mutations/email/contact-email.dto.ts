import { IsValidEmail } from "@/common/infrastructure/decorators";
import { IsDefined } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { UserTranslations } from "@/user/application/translations";

export class ContactEmailDto {
  readonly name: string;

  @IsValidEmail({
    message: i18nValidationMessage(UserTranslations.INVALID_EMAIL),
  })
  @IsDefined({
    message: i18nValidationMessage(UserTranslations.REQUIRED_EMAIL),
  })
  readonly email: string;

  readonly message: string;
}
