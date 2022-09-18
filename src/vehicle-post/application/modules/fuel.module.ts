import { LoggerService } from "@/common/infrastructure/logger";
import {
  FuelSchema,
  SchemaFuel,
  VehiclePost,
  VehiclePostSchema,
} from "@/vehicle-post/domain";
import {
  FuelFactory,
  FuelSchemaFactory,
} from "@/vehicle-post/infrastructure/factories";
import { VehiclePostsRepository } from "@/vehicle-post/infrastructure/persistence/repositories";
import { FuelDtoRepository } from "@/vehicle-post/infrastructure/persistence/repositories/fuels/fuel-dto.repository";
import { FuelEntityRepository } from "@/vehicle-post/infrastructure/persistence/repositories/fuels/fuel-entity.repository";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { FuelCommandHandlers } from "../commands/handlers";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: FuelSchema.name,
        schema: SchemaFuel,
      },
      {
        name: VehiclePost.name,
        schema: VehiclePostSchema,
      },
    ]),
  ],
  providers: [
    FuelEntityRepository,
    FuelSchemaFactory,
    FuelDtoRepository,
    VehiclePostsRepository,
    FuelFactory,
    LoggerService,
    ...FuelCommandHandlers,
  ],
})
export class FuelModule {}
