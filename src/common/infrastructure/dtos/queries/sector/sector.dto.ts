import { Presenter } from "@/common/infrastructure/presenters";
import { Sector } from "@/common/domain/entities";
import { ApiProperty } from "@nestjs/swagger";
import { IDefaultName } from "@/common/domain/types";

export class SectorDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: string;

  @ApiProperty({ required: true })
  readonly municipality: IDefaultName;

  private constructor(newSector: Sector) {
    super(newSector);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (newSector as any).name || newSector?.getName();

    this.municipality =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newSector as any).municipality || newSector?.getMunicipality();
  }

  public static create(newSector: Sector) {
    return new SectorDto(newSector);
  }
}
