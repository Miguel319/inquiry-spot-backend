import { LoggerService } from "@/common/infrastructure/logger";
import {
  ProvinceFactory,
  ProvinceSchemaFactory,
} from "@/common/infrastructure/factories";
import {
  ProvinceDtoRepository,
  ProvinceEntityRepository,
} from "@/common/infrastructure/persistence/repositories";
import { Module } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { ProvincesQueryHandlers } from "../../queries/handlers";
import {
  ProvinceSchema,
  SchemaProvince,
} from "@/common/infrastructure/persistence/schemas";
import { VehiclePost, VehiclePostSchema } from "@/vehicle/domain";
import {
  PropertyPost,
  PropertyPostSchema,
} from "@/real-state/infrastructure/persistence/schemas";
import { VehiclePostsRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { ProvincesCommandHandlers } from "../../commands/handlers";
import { ProvincesEventHandlers } from "../../events/handlers";
import { PropertyPostsRepository } from "@/real-state/infrastructure/persistence/repositories";
import { ProvincesController } from "@/common/presentation/controllers";

const providers = [
  ProvinceEntityRepository,
  ProvinceSchemaFactory,
  EventPublisher,
  ProvinceDtoRepository,
  LoggerService,
  ProvinceFactory,
  VehiclePostsRepository,
  PropertyPostsRepository,
  ...ProvincesQueryHandlers,
  ...ProvincesCommandHandlers,
  ...ProvincesEventHandlers,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: ProvinceSchema.name,
        schema: SchemaProvince,
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
  providers,
  controllers: [ProvincesController],
  exports: providers,
})
export class ProvinceModule {}
