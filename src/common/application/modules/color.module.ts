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
import {
  PropertyPost,
  PropertyPostSchema,
} from "@/real-state/infrastructure/persistence/schemas";
import { VehiclePostsRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { ColorsCommandHandlers } from "../commands/handlers";
import { ColorsEventHandlers } from "../events/handlers";
import { PropertyPostsRepository } from "@/real-state/infrastructure/persistence/repositories";
import { ColorsController } from "@/common/presentation/controllers";
import {
  SchemaVehiclePosts,
  VehiclePostSchema,
} from "@/vehicle/infrastructure/persistence/schemas";

const SharedProviders = [ColorEntityRepository, ColorSchemaFactory];

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
        name: VehiclePostSchema.name,
        schema: SchemaVehiclePosts,
      },
    ]),
  ],
  providers: [
    EventPublisher,
    ColorDtoRepository,
    LoggerService,
    ColorFactory,
    VehiclePostsRepository,
    PropertyPostsRepository,
    ...SharedProviders,
    ...ColorsQueryHandlers,
    ...ColorsCommandHandlers,
    ...ColorsEventHandlers,
  ],
  controllers: [ColorsController],
  exports: [...SharedProviders],
})
export class ColorModule {}
