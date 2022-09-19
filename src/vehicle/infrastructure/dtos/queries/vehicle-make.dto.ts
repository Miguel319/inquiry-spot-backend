import { Presenter } from "@/common/infrastructure/presenters";
import { VehicleMake } from "@/vehicle/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class VehicleMakeDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: string;

  private constructor(vehicleType: VehicleMake) {
    super(vehicleType);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (vehicleType as any).name || vehicleType?.getName();
  }

  public static create(vehicleType: VehicleMake) {
    return new VehicleMakeDto(vehicleType);
  }
}
