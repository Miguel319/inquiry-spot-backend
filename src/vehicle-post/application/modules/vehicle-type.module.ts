import { LoggerService } from "@/common/infrastructure/logger";
import {
  SchemaVehicleType,
  VehiclePost,
  VehiclePostSchema,
  VehicleTypeSchema,
} from "@/vehicle-post/domain";
import {
  VehicleTypeFactory,
  VehicleTypeSchemaFactory,
} from "@/vehicle-post/infrastructure/factories/vehicle-types";
import {
  VehiclePostsRepository,
  VehicleTypeDtoRepository,
  VehicleTypeEntityRepository,
} from "@/vehicle-post/infrastructure/persistence/repositories";
import { VehicleTypesController } from "@/vehicle-post/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { VehicleTypesCommandHandlers } from "../commands/handlers";
import { VehicleTypesEventHandlers } from "../events/handlers";
import { VehicleTypesQueryHandlers } from "../queries/handlers";

const providers = [
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
];

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
  providers,
  controllers: [VehicleTypesController],
})
export class VehicleTypeModule {}
