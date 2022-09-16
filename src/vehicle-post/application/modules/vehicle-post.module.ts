import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "../../../user/application/modules/users.module";
import { VehiclePostsController } from "@/vehicle-post/presentation/controllers";
import { VehiclePostsRepository } from "@/vehicle-post/infrastructure/persistence/repositories";
import { VehiclePostsService } from "../services/implementations/vehicle-posts";
import { VehiclePostSchema } from "@/vehicle-post/domain";

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
