import { LoggerService } from "@/common/infrastructure/logger";
import {
  SchemaVehicleMake,
  VehicleMakeSchema,
  VehiclePost,
  VehiclePostSchema,
} from "@/vehicle-post/domain";
import {
  VehicleMakeFactory,
  VehicleMakeSchemaFactory,
} from "@/vehicle-post/infrastructure/factories";
import {
  VehicleMakesEntityRepository,
  VehiclePostsRepository,
} from "@/vehicle-post/infrastructure/persistence/repositories";
import { VehicleMakesController } from "@/vehicle-post/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { VehicleMakesCommandHandlers } from "../commands/handlers";
import { VehicleMakesEventHandlers } from "../events/handlers";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: VehicleMakeSchema.name,
        schema: SchemaVehicleMake,
      },
      {
        name: VehiclePost.name,
        schema: VehiclePostSchema,
      },
    ]),
  ],
  providers: [
    VehicleMakesEntityRepository,
    VehicleMakeSchemaFactory,
    VehiclePostsRepository,
    VehicleMakeFactory,
    LoggerService,
    ...VehicleMakesCommandHandlers,
    ...VehicleMakesEventHandlers,
  ],
  controllers: [VehicleMakesController],
})
export class VehicleMakeModule {}
