import { LoggerService } from "@/common/infrastructure/logger";

import {
  VehicleTypeFactory,
  VehicleTypeSchemaFactory,
} from "@/vehicle/infrastructure/factories";
import {
  VehiclePostsRepository,
  VehicleTypeDtoRepository,
  VehicleTypeEntityRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import {
  SchemaVehiclePosts,
  SchemaVehicleType,
  VehiclePostSchema,
  VehicleTypeSchema,
} from "@/vehicle/infrastructure/persistence/schemas";
import { VehicleTypesController } from "@/vehicle/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { VehicleTypesCommandHandlers } from "../commands/handlers";
import { VehicleTypesEventHandlers } from "../events/handlers";
import { VehicleTypesQueryHandlers } from "../queries/handlers";

const SharedProviders = [VehicleTypeEntityRepository, VehicleTypeSchemaFactory];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: VehicleTypeSchema.name,
        schema: SchemaVehicleType,
      },
      {
        name: VehiclePostSchema.name,
        schema: SchemaVehiclePosts,
      },
    ]),
  ],
  providers: [
    EventPublisher,
    VehicleTypeDtoRepository,
    LoggerService,
    VehicleTypeFactory,
    VehiclePostsRepository,
    ...SharedProviders,
    ...VehicleTypesQueryHandlers,
    ...VehicleTypesCommandHandlers,
    ...VehicleTypesEventHandlers,
  ],
  controllers: [VehicleTypesController],
  exports: [...SharedProviders],
})
export class VehicleTypeModule {}
