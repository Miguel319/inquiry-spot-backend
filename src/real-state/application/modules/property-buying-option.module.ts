import { LoggerService } from "@/common/infrastructure/logger";

import {
  PropertyBuyingOptionFactory,
  PropertyBuyingOptionSchemaFactory,
} from "@/real-state/infrastructure/factories";
import {
  PropertyPostsRepository,
  PropertyBuyingOptionDtoRepository,
  PropertyBuyingOptionEntityRepository,
} from "@/real-state/infrastructure/persistence/repositories";
import {
  PropertyPostSchema,
  PropertyBuyingOptionSchema,
  SchemaPropertyBuyingOption,
  SchemaPropertyPost,
} from "@/real-state/infrastructure/persistence/schemas";
import { PropertyBuyingOptionController } from "@/real-state/presentation/controllers";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { PropertyBuyingOptionCommandHandlers } from "../commands/handlers";
import { PropertyBuyingOptionEventHandlers } from "../events/handlers";
import { PropertyBuyingOptionQueryHandlers } from "../queries/handlers";

const SharedProviders = [
  PropertyBuyingOptionEntityRepository,
  PropertyBuyingOptionSchemaFactory,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: PropertyBuyingOptionSchema.name,
        schema: SchemaPropertyBuyingOption,
      },
      {
        name: PropertyPostSchema.name,
        schema: SchemaPropertyPost,
      },
    ]),
  ],
  providers: [
    ...SharedProviders,
    PropertyBuyingOptionDtoRepository,
    LoggerService,
    PropertyBuyingOptionFactory,
    PropertyPostsRepository,
    ...PropertyBuyingOptionQueryHandlers,
    ...PropertyBuyingOptionCommandHandlers,
    ...PropertyBuyingOptionEventHandlers,
  ],
  controllers: [PropertyBuyingOptionController],
  exports: [...SharedProviders],
})
export class PropertyBuyingOptionModule {}
