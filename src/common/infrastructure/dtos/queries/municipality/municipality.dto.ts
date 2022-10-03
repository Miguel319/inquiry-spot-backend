import { Presenter } from "@/common/infrastructure/presenters";
import { Municipality } from "@/common/domain/entities";
import { ApiProperty } from "@nestjs/swagger";
import { IDefaultName } from "@/common/domain/types";

export class MunicipalityDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: string;

  @ApiProperty({ required: true })
  readonly province: IDefaultName;

  private constructor(newMunicipality: Municipality) {
    super(newMunicipality);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (newMunicipality as any).name || newMunicipality?.getName();

    this.province =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newMunicipality as any).province || newMunicipality?.getProvince();
  }

  public static create(newMunicipality: Municipality) {
    return new MunicipalityDto(newMunicipality);
  }
}
