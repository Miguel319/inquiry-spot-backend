import { LoggerService } from "@/common/infrastructure/logger";
import {
  ColorFactory,
  ColorSchemaFactory,
} from "@/common/infrastructure/factories";
import {
  ColorDtoRepository,
  ColorEntityRepository,
} from "@/common/infrastructure/persistence/repositories";
import { Module } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { ColorsQueryHandlers } from "../queries/handlers";
import {
  ColorSchema,
  SchemaColor,
} from "@/common/infrastructure/persistence/schemas";
import { VehiclePost, VehiclePostSchema } from "@/vehicle/domain";
import {
  PropertyPost,
  PropertyPostSchema,
} from "@/real-state/infrastructure/persistence/schemas";
import { VehiclePostsRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { ColorsCommandHandlers } from "../commands/handlers";
import { ColorsEventHandlers } from "../events/handlers";
import { PropertyPostsRepository } from "@/real-state/infrastructure/persistence/repositories";
import { ColorsController } from "@/common/presentation/controllers";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: ColorSchema.name,
        schema: SchemaColor,
      },
      {
        name: PropertyPost.name,
        schema: PropertyPostSchema,
      },
      {
        name: VehiclePost.name,
        schema: VehiclePostSchema,
      },
    ]),
  ],
  providers: [
    ColorEntityRepository,
    ColorSchemaFactory,
    EventPublisher,
    ColorDtoRepository,
    LoggerService,
    ColorFactory,
    VehiclePostsRepository,
    PropertyPostsRepository,
    ...ColorsQueryHandlers,
    ...ColorsCommandHandlers,
    ...ColorsEventHandlers,
  ],
  controllers: [ColorsController],
})
export class ColorModule {}
