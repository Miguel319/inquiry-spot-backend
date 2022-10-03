import { LoggerService } from "@/common/infrastructure/logger";
import {
  MunicipalityFactory,
  MunicipalitySchemaFactory,
} from "@/common/infrastructure/factories";
import {
  MunicipalityDtoRepository,
  MunicipalityEntityRepository,
  ProvinceEntityRepository,
} from "@/common/infrastructure/persistence/repositories";
import { Module } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { MunicipalitiesQueryHandlers } from "../../queries/handlers";
import {
  MunicipalitySchema,
  ProvinceSchema,
  SchemaMunicipality,
  SchemaProvince,
} from "@/common/infrastructure/persistence/schemas";
import { VehiclePost, VehiclePostSchema } from "@/vehicle/domain";
import {
  PropertyPost,
  PropertyPostSchema,
} from "@/real-state/infrastructure/persistence/schemas";
import { VehiclePostsRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { MunicipalitiesCommandHandlers } from "../../commands/handlers";
import { MunicipalitiesEventHandlers } from "../../events/handlers";
import { PropertyPostsRepository } from "@/real-state/infrastructure/persistence/repositories";
import { ProvinceModule } from "./province.module";
import { MunicipalitiesController } from "@/common/presentation/controllers/municipalities";

@Module({
  imports: [
    ProvinceModule,
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: MunicipalitySchema.name,
        schema: SchemaMunicipality,
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
        name: ProvinceSchema.name,
        schema: SchemaProvince,
      },
    ]),
  ],
  providers: [
    MunicipalityEntityRepository,
    MunicipalitySchemaFactory,
    EventPublisher,
    MunicipalityDtoRepository,
    LoggerService,
    MunicipalityFactory,
    ProvinceEntityRepository,
    VehiclePostsRepository,
    PropertyPostsRepository,
    ...MunicipalitiesQueryHandlers,
    ...MunicipalitiesCommandHandlers,
    ...MunicipalitiesEventHandlers,
  ],
  controllers: [MunicipalitiesController],
})
export class MunicipalityModule {}
