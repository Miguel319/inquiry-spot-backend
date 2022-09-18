import { LoggerService } from "@/common/infrastructure/logger";
import {
  SchemaTransmission,
  TransmissionSchema,
  VehiclePost,
  VehiclePostSchema,
} from "@/vehicle-post/domain";
import {
  TransmissionFactory,
  TransmissionSchemaFactory,
} from "@/vehicle-post/infrastructure/factories";
import {
  VehiclePostsRepository,
  TransmissionDtoRepository,
  TransmissionEntityRepository,
} from "@/vehicle-post/infrastructure/persistence/repositories";
import { TransmissionController } from "@/vehicle-post/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { TransmissionCommandHandlers } from "../commands/handlers";
import { TransmissionEventHandlers } from "../events/handlers";

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
  ],
  controllers: [TransmissionController],
})
export class TransmissionModule {}
