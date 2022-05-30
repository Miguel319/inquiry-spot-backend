import { VehiclePostSchema } from "@/domain/entities";
import { VehiclePostsController } from "@/infrastructure/controllers";
import { VehiclePostsRepository } from "@/infrastructure/repositories";
import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VehiclePostsService } from "../services/implementations/vehicle-posts/vehicle-posts.service";

const VehiclePostProvider: Provider = {
  provide: "IVehiclePostsService",
  useValue: VehiclePostsService,
};

@Module({
  imports: [
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
