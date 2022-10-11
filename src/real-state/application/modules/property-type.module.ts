import { LoggerService } from "@/common/infrastructure/logger";

import {
  PropertyTypeFactory,
  PropertyTypeSchemaFactory,
} from "@/real-state/infrastructure/factories";
import {
  PropertyPostsRepository,
  PropertyTypeDtoRepository,
  PropertyTypeEntityRepository,
} from "@/real-state/infrastructure/persistence/repositories";
import {
  PropertyPostSchema,
  PropertyTypeSchema,
  SchemaPropertyPost,
  SchemaPropertyType,
} from "@/real-state/infrastructure/persistence/schemas";
import { PropertyTypesController } from "@/real-state/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { PropertyTypesCommandHandlers } from "../commands/handlers";
import { PropertyTypeEventHandlers } from "../events/handlers";
import { PropertyTypesQueryHandlers } from "../queries/handlers";

const SharedProviders = [
  PropertyTypeEntityRepository,
  PropertyTypeSchemaFactory,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: PropertyTypeSchema.name,
        schema: SchemaPropertyType,
      },
      {
        name: PropertyPostSchema.name,
        schema: SchemaPropertyPost,
      },
    ]),
  ],
  providers: [
    ...SharedProviders,
    PropertyTypeDtoRepository,
    LoggerService,
    PropertyTypeFactory,
    PropertyPostsRepository,
    ...PropertyTypesQueryHandlers,
    ...PropertyTypesCommandHandlers,
    ...PropertyTypeEventHandlers,
  ],
  controllers: [PropertyTypesController],
  exports: [...SharedProviders],
})
export class PropertyTypeModule {}
