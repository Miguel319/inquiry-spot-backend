import { NameType } from "@/common/domain/entities";
import { Presenter } from "@/common/infrastructure/presenters";
import { VehicleStatus } from "@/vehicle/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class VehicleStatusDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: NameType;

  private constructor(vehicleType: VehicleStatus) {
    super(vehicleType);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (vehicleType as any).name || vehicleType?.getName();
  }

  public static create(vehicleType: VehicleStatus) {
    return new VehicleStatusDto(vehicleType);
  }
}
