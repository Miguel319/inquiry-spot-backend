import { IsValidEmail } from "../../../infrastructure/common/decorators";
import { MinLength } from "../../../infrastructure/common/decorators";
import { IsDefined } from "class-validator";
import { IsNotEmpty } from "../../common/decorators";
import { i18nValidationMessage } from "nestjs-i18n";

export class SignUpDto {
  @IsNotEmpty({ message: i18nValidationMessage("validations.user.name") })
  @IsDefined({ message: i18nValidationMessage("validations.user.name") })
  readonly name: string;

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

  @MinLength(6, {
    message: i18nValidationMessage("validations.user.minLength", {
      field: i18nValidationMessage("validations.user.passwordName"),
      min: 6,
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.user.password"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.user.password"),
  })
  password: string;
}
