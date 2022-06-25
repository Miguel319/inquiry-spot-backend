import { IsDefined, IsEnum, MaxLength, ValidateIf } from "class-validator";
import { IsNotEmpty, IsValidEmail, MinLength } from "../../common/decorators";
import { i18nValidationMessage } from "nestjs-i18n";
import { Role } from "../../../domain/entities";

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
    message: i18nValidationMessage("validations.user.passwordMinLength"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.user.password"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.user.password"),
  })
  password: string;

  @IsEnum(Role, {
    message: i18nValidationMessage("validations.user.invalidRole"),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.user.role"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.user.role"),
  })
  readonly role: Role;

  @MinLength(11, {
    message: i18nValidationMessage(
      "validations.user.minLengthIdentificationNumber",
    ),
  })
  @MaxLength(11, {
    message: i18nValidationMessage(
      "validations.user.maxLengthIdentificationNumber",
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage("validations.user.identificationNumber"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.user.identificationNumber"),
  })
  @ValidateIf((user) => user.role === Role.SELLER || user.role === Role.MIXED)
  readonly identificationNumber: string;
}
