import { IsNotEmpty, IsValidEmail } from "../../common/decorators";

import { IsDefined } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { UserTranslations } from "../../../domain/types";

export class SignInDto {
  @IsNotEmpty({
    message: i18nValidationMessage(UserTranslations.REQUIRED_EMAIL),
  })
  @IsValidEmail({
    message: i18nValidationMessage(UserTranslations.INVALID_EMAIL),
  })
  @IsDefined({
    message: i18nValidationMessage(UserTranslations.REQUIRED_EMAIL),
  })
  readonly email: string;

  @IsNotEmpty({
    message: i18nValidationMessage(UserTranslations.PASSWORD),
  })
  @IsDefined({
    message: i18nValidationMessage(UserTranslations.PASSWORD),
  })
  readonly password: string;
}
