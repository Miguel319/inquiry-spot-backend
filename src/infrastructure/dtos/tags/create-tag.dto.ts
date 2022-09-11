import { IsNotEmpty } from "@/common/infrastructure/decorators";
import { IsDefined, MaxLength } from "class-validator";

export class CreateTagDto {
  @IsNotEmpty({ message: "translations.tag.name" })
  @MaxLength(32, { message: "translations.tag.nameLength" })
  @IsDefined({ message: "translations.tag.name" })
  readonly name: string;
}
