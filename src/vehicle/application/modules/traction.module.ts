import { LoggerService } from "@/common/infrastructure/logger";
import {
  TractionFactory,
  TractionSchemaFactory,
} from "@/vehicle/infrastructure/factories";
import {
  TractionDtoRepository,
  TractionEntityRepository,
  VehiclePostsRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import {
  SchemaTraction,
  SchemaVehiclePosts,
  TractionSchema,
  VehiclePostSchema,
} from "@/vehicle/infrastructure/persistence/schemas";
import { TractionsController } from "@/vehicle/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { TractionCommandHandlers } from "../commands/handlers";
import { TractionEventHandlers } from "../events/handlers";
import { TractionQueryHandlers } from "../queries/handlers";

const SharedProviders = [TractionEntityRepository, TractionSchemaFactory];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: TractionSchema.name,
        schema: SchemaTraction,
      },
      {
        name: VehiclePostSchema.name,
        schema: SchemaVehiclePosts,
      },
    ]),
  ],
  providers: [
    TractionDtoRepository,
    VehiclePostsRepository,
    TractionFactory,
    LoggerService,
    ...SharedProviders,
    ...TractionCommandHandlers,
    ...TractionEventHandlers,
    ...TractionQueryHandlers,
  ],
  controllers: [TractionsController],
  exports: [...SharedProviders],
})
export class TractionModule {}
