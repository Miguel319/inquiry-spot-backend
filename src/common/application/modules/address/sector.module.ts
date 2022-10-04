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
import { VehiclePost, VehiclePostSchema } from "@/vehicle/domain";
import {
  PropertyPost,
  PropertyPostSchema,
} from "@/real-state/infrastructure/persistence/schemas";
import { VehiclePostsRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { SectorsCommandHandlers } from "../../commands/handlers";
import { SectorsEventHandlers } from "../../events/handlers";
import { PropertyPostsRepository } from "@/real-state/infrastructure/persistence/repositories";
import { MunicipalityModule } from "./municipality.module";
import { SectorsService } from "../../services/implementations";

const SectorServiceProvider: Provider = {
  provide: "ISectorsService",
  useClass: SectorsService,
};

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
        name: PropertyPost.name,
        schema: PropertyPostSchema,
      },
      {
        name: VehiclePost.name,
        schema: VehiclePostSchema,
      },
      {
        name: MunicipalitySchema.name,
        schema: SchemaMunicipality,
      },
    ]),
  ],
  providers: [
    SectorEntityRepository,
    SectorSchemaFactory,
    EventPublisher,
    SectorDtoRepository,
    SectorServiceProvider,
    LoggerService,
    SectorFactory,
    VehiclePostsRepository,
    PropertyPostsRepository,
    ...SectorsQueryHandlers,
    ...SectorsCommandHandlers,
    ...SectorsEventHandlers,
  ],
  //   controllers: [SectorsController],
})
export class SectorModule {}
