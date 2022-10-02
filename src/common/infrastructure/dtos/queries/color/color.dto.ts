import { Presenter } from "@/common/infrastructure/presenters";
import { Color } from "@/common/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class ColorDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: string;

  private constructor(color: Color) {
    super(color);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (color as any).name || color?.getName();
  }

  public static create(color: Color) {
    return new ColorDto(color);
  }
}
