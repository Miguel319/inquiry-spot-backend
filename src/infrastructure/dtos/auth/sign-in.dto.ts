import { IsNotEmpty } from "../../../infrastructure/common/decorators/is-not-empty.decorator";
import { IsValidEmail } from "../../../infrastructure/common/decorators/is-valid-email.decorator";

import { IsDefined } from "class-validator";

export class SignInDto {
  @IsValidEmail()
  @IsNotEmpty()
  @IsDefined({ message: "The 'email' field is required." })
  readonly email: string;

  @IsNotEmpty()
  @IsDefined({ message: "The 'password' field is required." })
  readonly password: string;
}
