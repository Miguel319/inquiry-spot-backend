import { LoggerService } from "@/common/infrastructure/logger";
import {
  SectorFactory,
  SectorSchemaFactory,
} from "@/common/infrastructure/factories";
import {
  SectorDtoRepository,
  SectorEntityRepository,
} from "@/common/infrastructure/persistence/repositories";
import { Module, Provider } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { SectorsQueryHandlers } from "../../queries/handlers";
import {
  SectorSchema,
  SchemaSector,
  MunicipalitySchema,
  SchemaMunicipality,
} from "@/common/infrastructure/persistence/schemas";
import {
  PropertyPostSchema,
  SchemaPropertyPost,
} from "@/real-state/infrastructure/persistence/schemas";
import { VehiclePostsRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { SectorsCommandHandlers } from "../../commands/handlers";
import { SectorsEventHandlers } from "../../events/handlers";
import { PropertyPostsRepository } from "@/real-state/infrastructure/persistence/repositories";
import { MunicipalityModule } from "./municipality.module";
import { SectorsService } from "../../services/implementations";
import { SectorsController } from "@/common/presentation/controllers";
import {
  SchemaVehiclePosts,
  VehiclePostSchema,
} from "@/vehicle/infrastructure/persistence/schemas";

const SectorServiceProvider: Provider = {
  provide: "ISectorsService",
  useClass: SectorsService,
};

const SharedProviders = [
  SectorServiceProvider,
  SectorEntityRepository,
  SectorSchemaFactory,
];

@Module({
  imports: [
    MunicipalityModule,
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: SectorSchema.name,
        schema: SchemaSector,
      },
      {
        name: PropertyPostSchema.name,
        schema: SchemaPropertyPost,
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
    SectorDtoRepository,
    LoggerService,
    SectorFactory,
    VehiclePostsRepository,
    PropertyPostsRepository,
    ...SharedProviders,
    ...SectorsQueryHandlers,
    ...SectorsCommandHandlers,
    ...SectorsEventHandlers,
  ],
  controllers: [SectorsController],
  exports: [...SharedProviders],
})
export class SectorModule {}
