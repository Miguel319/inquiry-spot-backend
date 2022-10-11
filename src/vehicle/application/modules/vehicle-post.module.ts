import { AddressModule } from "@/common/application/modules/address";
import { ColorModule } from "@/common/application/modules/color.module";
import { LoggerService } from "@/common/infrastructure/logger";
import { UsersModule } from "@/user/application/modules";

import {
  VehiclePostFactory,
  VehiclePostSchemaFactory,
} from "@/vehicle/infrastructure/factories";
import {
  VehiclePostsRepository,
  VehiclePostDtoRepository,
  VehiclePostEntityRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import {
  SchemaVehiclePosts,
  VehiclePostSchema,
} from "@/vehicle/infrastructure/persistence/schemas";
import { VehiclePostsController } from "@/vehicle/presentation/controllers";
import { Module, Provider } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { VehiclePostCommandHandlers } from "../commands/handlers";
import { VehiclePostEventHandlers } from "../events/handlers";
import { VehiclePostsQueryHandlers } from "../queries/handlers";
import { VehiclePostsService } from "../services/implementations";
import { FuelModule } from "./fuel.module";
import { TractionModule } from "./traction.module";
import { TransmissionModule } from "./transmission.module";
import { VehicleMakeModule } from "./vehicle-make.module";
import { VehicleStatusModule } from "./vehicle-status.module";
import { VehicleTypeModule } from "./vehicle-type.module";

const VehiclePostProvider: Provider = {
  provide: "IVehiclePostsService",
  useClass: VehiclePostsService,
};

const SharedProviders = [
  VehiclePostEntityRepository,
  VehiclePostProvider,
  VehiclePostSchemaFactory,
];

@Module({
  imports: [
    CqrsModule,
    VehicleTypeModule,
    ColorModule,
    AddressModule,
    VehicleMakeModule,
    TransmissionModule,
    FuelModule,
    UsersModule,
    TractionModule,
    VehicleStatusModule,
    MongooseModule.forFeature([
      {
        name: VehiclePostSchema.name,
        schema: SchemaVehiclePosts,
      },
    ]),
  ],
  providers: [
    EventPublisher,
    VehiclePostDtoRepository,
    LoggerService,
    VehiclePostFactory,
    VehiclePostsRepository,
    ...SharedProviders,
    ...VehiclePostsQueryHandlers,
    ...VehiclePostCommandHandlers,
    ...VehiclePostEventHandlers,
  ],
  controllers: [VehiclePostsController],
  exports: [...SharedProviders],
})
export class VehiclePostModule {}
