import { LoggerService } from "@/common/infrastructure/logger";

import {
  VehicleStatusFactory,
  VehicleStatusSchemaFactory,
} from "@/vehicle/infrastructure/factories";
import {
  VehiclePostsRepository,
  VehicleStatusDtoRepository,
  VehicleStatusEntityRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import {
  SchemaVehiclePosts,
  SchemaVehicleStatus,
  VehiclePostSchema,
  VehicleStatusSchema,
} from "@/vehicle/infrastructure/persistence/schemas";
import { VehicleStatusController } from "@/vehicle/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { VehicleStatusCommandHandlers } from "../commands/handlers";
import { VehicleStatusEventHandlers } from "../events/handlers";
import { VehicleStatusQueryHandlers } from "../queries/handlers";

const SharedProviders = [
  VehicleStatusEntityRepository,
  VehicleStatusSchemaFactory,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: VehicleStatusSchema.name,
        schema: SchemaVehicleStatus,
      },
      {
        name: VehiclePostSchema.name,
        schema: SchemaVehiclePosts,
      },
    ]),
  ],
  controllers: [VehicleStatusController],
  providers: [
    EventPublisher,
    VehicleStatusDtoRepository,
    LoggerService,
    VehicleStatusFactory,
    VehiclePostsRepository,
    ...SharedProviders,
    ...VehicleStatusQueryHandlers,
    ...VehicleStatusCommandHandlers,
    ...VehicleStatusEventHandlers,
  ],
  exports: [...SharedProviders],
})
export class VehicleStatusModule {}
