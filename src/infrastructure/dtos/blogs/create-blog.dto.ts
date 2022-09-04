import { IsNotEmpty } from "@/infrastructure/common/decorators/is-not-empty.decorator";
import { IsDefined, MinLength } from "class-validator";

export class CreateBlogDto {
  @IsNotEmpty()
  @IsDefined({ message: "The title is mandatory." })
  readonly title: string;

  @MinLength(150, { message: "The body must have at least 150 characters." })
  @IsNotEmpty()
  @IsDefined({ message: "The body is mandatory." })
  readonly body: string;

  @IsDefined({ message: "The photo is mandatory." })
  photo: string;

  @IsNotEmpty()
  @IsDefined({ message: "The tags are mandatory." })
  tags: Array<string>;

  @IsNotEmpty()
  @IsDefined({ message: "The categories are mandatory." })
  readonly categories: Array<string>;
}
