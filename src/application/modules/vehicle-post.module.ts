import { VehiclePostSchema } from "@/domain/entities";
import { VehiclePostsController } from "@/presentation/controllers";
import { VehiclePostsRepository } from "@/infrastructure/repositories";
import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VehiclePostsService } from "../services/implementations";
import { UsersModule } from "./users.module";

const VehiclePostProvider: Provider = {
  provide: "IVehiclePostsService",
  useClass: VehiclePostsService,
};

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: "VehiclePost",
        schema: VehiclePostSchema,
      },
    ]),
  ],
  controllers: [VehiclePostsController],
  providers: [VehiclePostsRepository, VehiclePostProvider],
  exports: [VehiclePostsRepository, VehiclePostProvider],
})
export class VehiclePostModule {}
