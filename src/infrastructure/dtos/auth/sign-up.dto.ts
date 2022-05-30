import { IsValidEmail } from "../../../infrastructure/common/decorators/is-valid-email.decorator";
import { MinLength } from "../../../infrastructure/common/decorators/min-length.decorator";
import { IsDefined } from "class-validator";
import { IsNotEmpty } from "../../common/decorators";

export class SignUpDto {
  @IsNotEmpty({})
  @IsDefined({ message: "The name is mandatory." })
  readonly name: string;

  @IsNotEmpty()
  @IsValidEmail({ message: "Invalid email." })
  @IsDefined({ message: "The email is mandatory." })
  readonly email: string;

  @MinLength(6, { message: "The password must be at least 6 characters long." })
  @IsNotEmpty()
  @IsDefined({ message: "The password is mandatory." })
  password: string;
}
