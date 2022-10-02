import { Presenter } from "@/common/infrastructure/presenters";
import { VehicleMake } from "@/vehicle/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class VehicleMakeDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: string;

  private constructor(vehicleMake: VehicleMake) {
    super(vehicleMake);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.name = (vehicleMake as any).name || vehicleMake?.getName();
  }

  public static create(vehicleMake: VehicleMake) {
    return new VehicleMakeDto(vehicleMake);
  }
}
