import { LoggerService } from "@/common/infrastructure/logger";

import {
  TransmissionFactory,
  TransmissionSchemaFactory,
} from "@/vehicle/infrastructure/factories";
import {
  VehiclePostsRepository,
  TransmissionDtoRepository,
  TransmissionEntityRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import {
  SchemaTransmission,
  SchemaVehiclePosts,
  TransmissionSchema,
  VehiclePostSchema,
} from "@/vehicle/infrastructure/persistence/schemas";
import { TransmissionController } from "@/vehicle/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { TransmissionCommandHandlers } from "../commands/handlers";
import { TransmissionEventHandlers } from "../events/handlers";
import { TransmissionQueryHandlers } from "../queries/handlers";

const SharedProviders = [
  TransmissionEntityRepository,
  TransmissionSchemaFactory,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: TransmissionSchema.name,
        schema: SchemaTransmission,
      },
      {
        name: VehiclePostSchema.name,
        schema: SchemaVehiclePosts,
      },
    ]),
  ],
  providers: [
    TransmissionDtoRepository,
    VehiclePostsRepository,
    TransmissionFactory,
    LoggerService,
    ...SharedProviders,
    ...TransmissionCommandHandlers,
    ...TransmissionEventHandlers,
    ...TransmissionQueryHandlers,
  ],
  controllers: [TransmissionController],
  exports: [...SharedProviders],
})
export class TransmissionModule {}
