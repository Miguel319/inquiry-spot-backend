import { LoggerService } from "@/common/infrastructure/logger";

import {
  FuelFactory,
  FuelSchemaFactory,
} from "@/vehicle/infrastructure/factories";
import {
  VehiclePostsRepository,
  FuelDtoRepository,
  FuelEntityRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import {
  FuelSchema,
  SchemaFuel,
  SchemaVehiclePosts,
  VehiclePostSchema,
} from "@/vehicle/infrastructure/persistence/schemas";
import { FuelsController } from "@/vehicle/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { FuelCommandHandlers } from "../commands/handlers";
import { FuelEventHandlers } from "../events/handlers";
import { FuelQueryHandlers } from "../queries/handlers";

const SharedProviders = [FuelEntityRepository, FuelSchemaFactory];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: FuelSchema.name,
        schema: SchemaFuel,
      },
      {
        name: VehiclePostSchema.name,
        schema: SchemaVehiclePosts,
      },
    ]),
  ],
  providers: [
    FuelDtoRepository,
    VehiclePostsRepository,
    FuelFactory,
    LoggerService,
    ...SharedProviders,
    ...FuelCommandHandlers,
    ...FuelQueryHandlers,
    ...FuelEventHandlers,
  ],
  controllers: [FuelsController],
  exports: [...SharedProviders],
})
export class FuelModule {}
