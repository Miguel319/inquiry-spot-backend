import { IsNotEmpty } from "@/infrastructure/common/decorators/is-not-empty.decorator";
import { IsDefined, MaxLength } from "class-validator";

export class CreateTagDto {
  @IsNotEmpty()
  @MaxLength(32, { message: "The name cannot have more than 32 characters." })
  @IsDefined({ message: "The name is mandatory." })
  readonly name: string;
}
