import { Presenter } from "@/common/infrastructure/presenters";
import { Province } from "@/common/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class ProvinceDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: string;

  private constructor(province: Province) {
    super(province);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (province as any).name || province?.getName();
  }

  public static create(province: Province) {
    return new ProvinceDto(province);
  }
}
