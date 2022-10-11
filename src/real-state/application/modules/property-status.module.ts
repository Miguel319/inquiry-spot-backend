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
  PropertyPostSchema,
  PropertyStatusSchema,
  SchemaPropertyPost,
  SchemaPropertyStatus,
} from "@/real-state/infrastructure/persistence/schemas";
import { PropertyStatusController } from "@/real-state/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { PropertyStatusCommandHandlers } from "../commands/handlers";
import { PropertyStatusEventHandlers } from "../events/handlers";
import { PropertyStatusQueryHandlers } from "../queries/handlers";

const SharedProviders = [
  PropertyStatusEntityRepository,
  PropertyStatusSchemaFactory,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: PropertyStatusSchema.name,
        schema: SchemaPropertyStatus,
      },
      {
        name: PropertyPostSchema.name,
        schema: SchemaPropertyPost,
      },
    ]),
  ],
  providers: [
    ...SharedProviders,
    PropertyStatusDtoRepository,
    LoggerService,
    PropertyStatusFactory,
    PropertyPostsRepository,
    ...PropertyStatusQueryHandlers,
    ...PropertyStatusCommandHandlers,
    ...PropertyStatusEventHandlers,
  ],
  controllers: [PropertyStatusController],
  exports: [...SharedProviders],
})
export class PropertyStatusModule {}
