import { LoggerService } from "@/common/infrastructure/logger";

import {
  PropertyStatusFactory,
  PropertyStatusSchemaFactory,
} from "@/real-state/infrastructure/factories";
import {
  PropertyPostsRepository,
  PropertyStatusDtoRepository,
  PropertyStatusEntityRepository,
} from "@/real-state/infrastructure/persistence/repositories";
import {
  PropertyPost,
  PropertyPostSchema,
  PropertyStatusSchema,
  SchemaPropertyStatus,
} from "@/real-state/infrastructure/persistence/schemas";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { PropertyStatusCommandHandlers } from "../commands/handlers";
import { PropertyStatusEventHandlers } from "../events/handlers";
import { PropertyStatusQueryHandlers } from "../queries/handlers";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: PropertyStatusSchema.name,
        schema: SchemaPropertyStatus,
      },
      {
        name: PropertyPost.name,
        schema: PropertyPostSchema,
      },
    ]),
  ],
  providers: [
    PropertyStatusEntityRepository,
    PropertyStatusSchemaFactory,
    PropertyStatusDtoRepository,
    LoggerService,
    PropertyStatusFactory,
    PropertyPostsRepository,
    ...PropertyStatusQueryHandlers,
    ...PropertyStatusCommandHandlers,
    ...PropertyStatusEventHandlers,
  ],
})
export class PropertyStatusModule {}
