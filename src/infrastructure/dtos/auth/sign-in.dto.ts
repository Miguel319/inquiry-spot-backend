import { IsNotEmpty } from "../../../infrastructure/common/decorators";
import { IsValidEmail } from "../../../infrastructure/common/decorators";

import { IsDefined } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class SignInDto {
  @IsNotEmpty({
    message: i18nValidationMessage("validations.user.requiredEmail"),
  })
  @IsValidEmail({
    message: i18nValidationMessage("validations.user.invalidEmail"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.user.requiredEmail"),
  })
  readonly email: string;

  @IsNotEmpty({
    message: i18nValidationMessage("validations.user.password"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.user.password"),
  })
  readonly password: string;
}
