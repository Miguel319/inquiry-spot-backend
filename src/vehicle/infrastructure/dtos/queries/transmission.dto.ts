import { NameType } from "@/common/domain/entities";
import { Presenter } from "@/common/infrastructure/presenters";
import { Transmission } from "@/vehicle/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class TransmissionDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: NameType;

  private constructor(transmission: Transmission) {
    super(transmission);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (transmission as any).name || transmission?.getName();
  }

  public static create(transmission: Transmission) {
    return new TransmissionDto(transmission);
  }
}
