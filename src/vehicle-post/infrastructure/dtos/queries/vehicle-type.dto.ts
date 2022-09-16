import { Presenter } from "@/common/infrastructure/presenters";
import { VehicleType } from "@/vehicle-post/domain/entities";
import { ApiProperty } from "@nestjs/swagger";

export class VehicleTypeDto extends Presenter {
  @ApiProperty({ required: true })
  readonly name: string;

  private constructor(vehicleType: VehicleType) {
    super(vehicleType);

    this.name = vehicleType.getName();
  }

  public static create(vehicleType: VehicleType) {
    return new VehicleTypeDto(vehicleType);
  }
}
