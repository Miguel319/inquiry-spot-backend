import { NameType } from "@/common/domain/entities";
import { Presenter } from "@/common/infrastructure/presenters";
import { Traction } from "@/vehicle/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class TractionDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: NameType;

  private constructor(traction: Traction) {
    super(traction);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (traction as any).name || traction?.getName();
  }

  public static create(traction: Traction) {
    return new TractionDto(traction);
  }
}
