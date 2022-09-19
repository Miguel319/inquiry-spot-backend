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
  PropertyPost,
  PropertyPostSchema,
  PropertyTypeSchema,
  SchemaPropertyType,
} from "@/real-state/infrastructure/persistence/schemas";
import { Module } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { PropertyTypesCommandHandlers } from "../commands/handlers";
import { PropertyTypeEventHandlers } from "../events/handlers";
import { PropertyTypesQueryHandlers } from "../queries/handlers";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: PropertyTypeSchema.name,
        schema: SchemaPropertyType,
      },
      {
        name: PropertyPost.name,
        schema: PropertyPostSchema,
      },
    ]),
  ],
  providers: [
    PropertyTypeEntityRepository,
    PropertyTypeSchemaFactory,
    EventPublisher,
    PropertyTypeDtoRepository,
    LoggerService,
    PropertyTypeFactory,
    PropertyPostsRepository,
    ...PropertyTypesQueryHandlers,
    ...PropertyTypesCommandHandlers,
    ...PropertyTypeEventHandlers,
  ],
})
export class PropertyTypeModule {}
