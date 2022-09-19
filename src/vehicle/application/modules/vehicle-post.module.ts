import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "../../../user/application/modules";
import { VehiclePostsController } from "@/vehicle/presentation/controllers";
import { VehiclePostsRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { VehiclePostsService } from "../services/implementations";
import { VehiclePost, VehiclePostSchema } from "@/vehicle/domain";

const VehiclePostProvider: Provider = {
  provide: "IVehiclePostsService",
  useClass: VehiclePostsService,
};

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: VehiclePost.name,
        schema: VehiclePostSchema,
      },
    ]),
  ],
  controllers: [VehiclePostsController],
  providers: [VehiclePostsRepository, VehiclePostProvider],
  exports: [VehiclePostsRepository, VehiclePostProvider],
})
export class VehiclePostModule {}
