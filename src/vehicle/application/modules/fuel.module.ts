import { LoggerService } from "@/common/infrastructure/logger";
import {
  FuelSchema,
  SchemaFuel,
  VehiclePost,
  VehiclePostSchema,
} from "@/vehicle/domain";
import {
  FuelFactory,
  FuelSchemaFactory,
} from "@/vehicle/infrastructure/factories";
import {
  VehiclePostsRepository,
  FuelDtoRepository,
  FuelEntityRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import { FuelsController } from "@/vehicle/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { FuelCommandHandlers } from "../commands/handlers";
import { FuelEventHandlers } from "../events/handlers";
import { FuelQueryHandlers } from "../queries/handlers";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: FuelSchema.name,
        schema: SchemaFuel,
      },
      {
        name: VehiclePost.name,
        schema: VehiclePostSchema,
      },
    ]),
  ],
  providers: [
    FuelEntityRepository,
    FuelSchemaFactory,
    FuelDtoRepository,
    VehiclePostsRepository,
    FuelFactory,
    LoggerService,
    ...FuelCommandHandlers,
    ...FuelQueryHandlers,
    ...FuelEventHandlers,
  ],
  controllers: [FuelsController],
})
export class FuelModule {}
