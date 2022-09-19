import { LoggerService } from "@/common/infrastructure/logger";
import {
  SchemaTransmission,
  TransmissionSchema,
  VehiclePost,
  VehiclePostSchema,
} from "@/vehicle/domain";
import {
  TransmissionFactory,
  TransmissionSchemaFactory,
} from "@/vehicle/infrastructure/factories";
import {
  VehiclePostsRepository,
  TransmissionDtoRepository,
  TransmissionEntityRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import { TransmissionController } from "@/vehicle/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { TransmissionCommandHandlers } from "../commands/handlers";
import { TransmissionEventHandlers } from "../events/handlers";
import { TransmissionQueryHandlers } from "../queries/handlers";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: TransmissionSchema.name,
        schema: SchemaTransmission,
      },
      {
        name: VehiclePost.name,
        schema: VehiclePostSchema,
      },
    ]),
  ],
  providers: [
    TransmissionEntityRepository,
    TransmissionSchemaFactory,
    TransmissionDtoRepository,
    VehiclePostsRepository,
    TransmissionFactory,
    LoggerService,
    ...TransmissionCommandHandlers,
    ...TransmissionEventHandlers,
    ...TransmissionQueryHandlers,
  ],
  controllers: [TransmissionController],
})
export class TransmissionModule {}
