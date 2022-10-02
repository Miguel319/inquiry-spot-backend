import { LoggerService } from "@/common/infrastructure/logger";
import {
  SchemaVehicleType,
  VehiclePost,
  VehiclePostSchema,
  VehicleTypeSchema,
} from "@/vehicle/domain";
import {
  VehicleTypeFactory,
  VehicleTypeSchemaFactory,
} from "@/vehicle/infrastructure/factories";
import {
  VehiclePostsRepository,
  VehicleTypeDtoRepository,
  VehicleTypeEntityRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import { VehicleTypesController } from "@/vehicle/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { VehicleTypesCommandHandlers } from "../commands/handlers";
import { VehicleTypesEventHandlers } from "../events/handlers";
import { VehicleTypesQueryHandlers } from "../queries/handlers";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: VehicleTypeSchema.name,
        schema: SchemaVehicleType,
      },
      {
        name: VehiclePost.name,
        schema: VehiclePostSchema,
      },
    ]),
  ],
  providers: [
    VehicleTypeEntityRepository,
    VehicleTypeSchemaFactory,
    EventPublisher,
    VehicleTypeDtoRepository,
    LoggerService,
    VehicleTypeFactory,
    VehiclePostsRepository,
    ...VehicleTypesQueryHandlers,
    ...VehicleTypesCommandHandlers,
    ...VehicleTypesEventHandlers,
  ],
  controllers: [VehicleTypesController],
})
export class VehicleTypeModule {}
