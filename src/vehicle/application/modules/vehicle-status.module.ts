import { LoggerService } from "@/common/infrastructure/logger";
import {
  SchemaVehicleStatus,
  VehiclePost,
  VehiclePostSchema,
  VehicleStatusSchema,
} from "@/vehicle/domain";
import {
  VehicleStatusFactory,
  VehicleStatusSchemaFactory,
} from "@/vehicle/infrastructure/factories";
import {
  VehiclePostsRepository,
  VehicleStatusDtoRepository,
  VehicleStatusEntityRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import { VehicleStatusController } from "@/vehicle/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { VehicleStatusCommandHandlers } from "../commands/handlers";
import { VehicleStatusEventHandlers } from "../events/handlers";
import { VehicleStatusQueryHandlers } from "../queries/handlers";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: VehicleStatusSchema.name,
        schema: SchemaVehicleStatus,
      },
      {
        name: VehiclePost.name,
        schema: VehiclePostSchema,
      },
    ]),
  ],
  controllers: [VehicleStatusController],
  providers: [
    VehicleStatusEntityRepository,
    VehicleStatusSchemaFactory,
    EventPublisher,
    VehicleStatusDtoRepository,
    LoggerService,
    VehicleStatusFactory,
    VehiclePostsRepository,
    ...VehicleStatusQueryHandlers,
    ...VehicleStatusCommandHandlers,
    ...VehicleStatusEventHandlers,
  ],
})
export class VehicleStatusModule {}
