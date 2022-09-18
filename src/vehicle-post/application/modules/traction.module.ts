import { LoggerService } from "@/common/infrastructure/logger";
import {
  SchemaTraction,
  TractionSchema,
  VehiclePost,
  VehiclePostSchema,
} from "@/vehicle-post/domain";
import {
  TractionFactory,
  TractionSchemaFactory,
} from "@/vehicle-post/infrastructure/factories";
import {
  TractionDtoRepository,
  TractionEntityRepository,
  VehiclePostsRepository,
} from "@/vehicle-post/infrastructure/persistence/repositories";
import { TractionsController } from "@/vehicle-post/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { TractionCommandHandlers } from "../commands/handlers";
import { TractionEventHandlers } from "../events/handlers";
import { TractionQueryHandlers } from "../queries/handlers";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: TractionSchema.name,
        schema: SchemaTraction,
      },
      {
        name: VehiclePost.name,
        schema: VehiclePostSchema,
      },
    ]),
  ],
  providers: [
    TractionEntityRepository,
    TractionSchemaFactory,
    TractionDtoRepository,
    VehiclePostsRepository,
    TractionFactory,
    LoggerService,
    ...TractionCommandHandlers,
    ...TractionEventHandlers,
    ...TractionQueryHandlers,
  ],
  controllers: [TractionsController],
})
export class TractionModule {}
