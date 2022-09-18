import { NameType } from "@/common/domain/entities";
import { Presenter } from "@/common/infrastructure/presenters";
import { Fuel } from "@/vehicle-post/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class FuelDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: NameType;

  private constructor(fuel: Fuel) {
    super(fuel);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (fuel as any).name || fuel?.getName();
  }

  public static create(fuel: Fuel) {
    return new FuelDto(fuel);
  }
}
