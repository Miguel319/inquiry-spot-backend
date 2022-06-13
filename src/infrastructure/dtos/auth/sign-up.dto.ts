import { IsValidEmail } from "../../../infrastructure/common/decorators";
import { MinLength } from "../../../infrastructure/common/decorators";
import { IsDefined } from "class-validator";
import { IsNotEmpty } from "../../common/decorators";
import { i18nValidationMessage } from "nestjs-i18n";

export class SignUpDto {
  @IsNotEmpty({})
  @IsDefined({ message: "The name is mandatory." })
  readonly name: string;

  @IsNotEmpty({ message: i18nValidationMessage("validations.requiredEmail") })
  @IsValidEmail({ message: i18nValidationMessage("validations.invalidEmail") })
  @IsDefined({ message: "The email is mandatory." })
  readonly email: string;

  @MinLength(6, { message: "The password must be at least 6 characters long." })
  @IsNotEmpty()
  @IsDefined({ message: "The password is mandatory." })
  password: string;
}
