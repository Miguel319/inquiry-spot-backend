import { Module } from "@nestjs/common";

import { VehiclePostModule } from "./vehicle-post.module";
import { VehicleTypeModule } from "./vehicle-type.module";
import { VehicleMakeModule } from "./vehicle-make.module";
import { TransmissionModule } from "./transmission.module";
import { FuelModule } from "./fuel.module";
import { TractionModule } from "./traction.module";

@Module({
  imports: [
    VehiclePostModule,
    VehicleTypeModule,
    VehicleMakeModule,
    TransmissionModule,
    FuelModule,
    TractionModule,
  ],
})
export class VehiclesModule {}
