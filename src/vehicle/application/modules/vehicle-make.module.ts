import { LoggerService } from "@/common/infrastructure/logger";

import {
  VehicleMakeFactory,
  VehicleMakeSchemaFactory,
} from "@/vehicle/infrastructure/factories";
import {
  VehicleMakeDtoRepository,
  VehicleMakesEntityRepository,
  VehiclePostsRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import {
  SchemaVehicleMake,
  SchemaVehiclePosts,
  VehicleMakeSchema,
  VehiclePostSchema,
} from "@/vehicle/infrastructure/persistence/schemas";
import { VehicleMakesController } from "@/vehicle/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { VehicleMakesCommandHandlers } from "../commands/handlers";
import { VehicleMakesEventHandlers } from "../events/handlers";
import { VehicleMakesQueryHandlers } from "../queries/handlers";

const SharedProviders = [
  VehicleMakesEntityRepository,
  VehicleMakeSchemaFactory,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: VehicleMakeSchema.name,
        schema: SchemaVehicleMake,
      },
      {
        name: VehiclePostSchema.name,
        schema: SchemaVehiclePosts,
      },
    ]),
  ],
  providers: [
    VehicleMakeDtoRepository,
    VehiclePostsRepository,
    VehicleMakeFactory,
    LoggerService,
    ...SharedProviders,
    ...VehicleMakesCommandHandlers,
    ...VehicleMakesEventHandlers,
    ...VehicleMakesQueryHandlers,
  ],
  controllers: [VehicleMakesController],
  exports: [...SharedProviders],
})
export class VehicleMakeModule {}
