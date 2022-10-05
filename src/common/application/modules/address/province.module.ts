import { LoggerService } from "@/common/infrastructure/logger";
import {
  MunicipalitySchemaFactory,
  ProvinceFactory,
  ProvinceSchemaFactory,
} from "@/common/infrastructure/factories";
import {
  MunicipalityEntityRepository,
  ProvinceDtoRepository,
  ProvinceEntityRepository,
} from "@/common/infrastructure/persistence/repositories";
import { Module, Provider } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { ProvincesQueryHandlers } from "../../queries/handlers";
import {
  MunicipalitySchema,
  ProvinceSchema,
  SchemaMunicipality,
  SchemaProvince,
} from "@/common/infrastructure/persistence/schemas";
import {
  PropertyPost,
  PropertyPostSchema,
} from "@/real-state/infrastructure/persistence/schemas";
import { VehiclePostsRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { ProvincesCommandHandlers } from "../../commands/handlers";
import { ProvincesEventHandlers } from "../../events/handlers";
import { PropertyPostsRepository } from "@/real-state/infrastructure/persistence/repositories";
import { ProvincesController } from "@/common/presentation/controllers";
import {
  SchemaVehiclePosts,
  VehiclePostSchema,
} from "@/vehicle/infrastructure/persistence/schemas";
import { ProvincesService } from "../../services/implementations";

const ProvinceServiceProvider: Provider = {
  provide: "IProvincesService",
  useClass: ProvincesService,
};

const SharedProviders = [
  ProvinceEntityRepository,
  ProvinceSchemaFactory,
  ProvinceServiceProvider,
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
        name: VehiclePostSchema.name,
        schema: SchemaVehiclePosts,
      },
      {
        name: MunicipalitySchema.name,
        schema: SchemaMunicipality,
      },
    ]),
  ],
  providers: [
    EventPublisher,
    ProvinceDtoRepository,
    LoggerService,
    ProvinceFactory,
    VehiclePostsRepository,
    MunicipalitySchemaFactory,
    MunicipalityEntityRepository,
    PropertyPostsRepository,
    ...SharedProviders,
    ...ProvincesQueryHandlers,
    ...ProvincesCommandHandlers,
    ...ProvincesEventHandlers,
  ],
  controllers: [ProvincesController],
  exports: [...SharedProviders],
})
export class ProvinceModule {}
