import { IsDefined, IsEnum, Length, ValidateIf } from "class-validator";
import { IsNotEmpty, IsValidEmail, MinLength } from "../../common/decorators";
import { i18nValidationMessage } from "nestjs-i18n";
import { Role, UserTranslations } from "../../../domain/types";

export class SignUpDto {
  @IsNotEmpty({ message: i18nValidationMessage(UserTranslations.NAME) })
  @IsDefined({ message: i18nValidationMessage(UserTranslations.NAME) })
  readonly name: string;

  @IsValidEmail({
    message: i18nValidationMessage(UserTranslations.INVALID_EMAIL),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(UserTranslations.REQUIRED_EMAIL),
  })
  @IsDefined({
    message: i18nValidationMessage(UserTranslations.REQUIRED_EMAIL),
  })
  readonly email: string;

  @MinLength(6, {
    message: i18nValidationMessage(UserTranslations.PASSWORD_MIN_LENGTH),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(UserTranslations.PASSWORD),
  })
  @IsDefined({
    message: i18nValidationMessage(UserTranslations.PASSWORD),
  })
  password: string;

  @IsEnum(Role, {
    message: i18nValidationMessage(UserTranslations.INVALID_ROLE),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(UserTranslations.ROLE),
  })
  @IsDefined({
    message: i18nValidationMessage(UserTranslations.ROLE),
  })
  readonly role: Role;

  @Length(11, 11, {
    message: i18nValidationMessage(UserTranslations.PASSWORD_MIN_LENGTH),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(UserTranslations.IDENTIFICATION_NUMBER),
  })
  @IsDefined({
    message: i18nValidationMessage(UserTranslations.IDENTIFICATION_NUMBER),
  })
  @ValidateIf((user) => user.role === Role.SELLER || user.role === Role.MIXED)
  readonly identificationNumber: string;
}
