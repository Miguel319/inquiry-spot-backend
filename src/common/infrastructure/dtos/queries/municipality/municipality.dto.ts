import { Presenter } from "@/common/infrastructure/presenters";
import { Municipality } from "@/common/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class MunicipalityDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: string;

  private constructor(province: Municipality) {
    super(province);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (province as any).name || province?.getName();
  }

  public static create(province: Municipality) {
    return new MunicipalityDto(province);
  }
}
