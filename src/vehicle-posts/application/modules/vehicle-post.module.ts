import { VehiclePostSchema } from "@/domain/entities";
import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "../../../application/modules/users.module";
import { VehiclePostsController } from "@/vehicle-posts/presentation/controllers";
import { VehiclePostsRepository } from "@/vehicle-posts/infrastructure/persistence/repositories";
import { VehiclePostsService } from "../services/implementations";

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
