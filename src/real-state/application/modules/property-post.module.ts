import { ColorModule } from "@/common/application/modules/color.module";
import { LoggerService } from "@/common/infrastructure/logger";
import { UsersModule } from "@/user/application/modules";

import {
  PropertyPostFactory,
  PropertyPostSchemaFactory,
} from "@/real-state/infrastructure/factories";
import {
  PropertyPostsRepository,
  PropertyPostDtoRepository,
  PropertyPostEntityRepository,
} from "@/real-state/infrastructure/persistence/repositories";
import {
  PropertyPostSchema,
  SchemaPropertyPost,
} from "@/real-state/infrastructure/persistence/schemas";
import { PropertyPostsController } from "@/real-state/presentation/controllers";
import { Module, Provider } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { PropertyPostEventHandlers } from "../events/handlers";
import { PropertyPostsQueryHandlers } from "../queries/handlers";
import { PropertyPostsService } from "../services/implementations";
import { VehicleTypeModule } from "@/vehicle/application/modules/vehicle-type.module";
import { PropertyBuyingOptionModule } from "./property-buying-option.module";
import { TractionModule } from "@/vehicle/application/modules/traction.module";
import { PropertyStatusModule } from "./property-status.module";
import { PropertyTypeModule } from "./property-type.module";
import { AddressModule } from "@/common/application/modules/address";

const PropertyPostProvider: Provider = {
  provide: "IPropertyPostsService",
  useClass: PropertyPostsService,
};

const SharedProviders = [
  PropertyPostEntityRepository,
  PropertyPostProvider,
  PropertyPostSchemaFactory,
];

@Module({
  imports: [
    CqrsModule,
    VehicleTypeModule,
    ColorModule,
    AddressModule,
    PropertyBuyingOptionModule,
    PropertyTypeModule,
    UsersModule,
    TractionModule,
    PropertyStatusModule,
    MongooseModule.forFeature([
      {
        name: PropertyPostSchema.name,
        schema: SchemaPropertyPost,
      },
    ]),
  ],
  providers: [
    EventPublisher,
    PropertyPostDtoRepository,
    LoggerService,
    PropertyPostFactory,
    PropertyPostsRepository,
    ...SharedProviders,
    ...PropertyPostsQueryHandlers,
    ...PropertyPostEventHandlers,
    ...PropertyPostEventHandlers,
  ],
  controllers: [PropertyPostsController],
  exports: [...SharedProviders],
})
export class PropertyPostModule {}
