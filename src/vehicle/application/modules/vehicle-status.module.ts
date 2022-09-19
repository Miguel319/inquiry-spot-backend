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
import { Module } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { VehicleStatussCommandHandlers } from "../commands/handlers";
import { VehicleStatussEventHandlers } from "../events/handlers";
import { VehicleStatussQueryHandlers } from "../queries/handlers";

const providers = [
  VehicleStatusEntityRepository,
  VehicleStatusSchemaFactory,
  EventPublisher,
  VehicleStatusDtoRepository,
  LoggerService,
  VehicleStatusFactory,
  VehiclePostsRepository,
  ...VehicleStatussQueryHandlers,
  ...VehicleStatussCommandHandlers,
  ...VehicleStatussEventHandlers,
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
        name: VehiclePost.name,
        schema: VehiclePostSchema,
      },
    ]),
  ],
  providers,
})
export class VehicleStatusModule {}
