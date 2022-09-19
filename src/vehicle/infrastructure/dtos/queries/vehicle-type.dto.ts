import { NameType } from "@/common/domain/entities";
import { Presenter } from "@/common/infrastructure/presenters";
import { VehicleType } from "@/vehicle/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class VehicleTypeDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: NameType;

  private constructor(vehicleType: VehicleType) {
    super(vehicleType);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (vehicleType as any).name || vehicleType?.getName();
  }

  public static create(vehicleType: VehicleType) {
    return new VehicleTypeDto(vehicleType);
  }
}
