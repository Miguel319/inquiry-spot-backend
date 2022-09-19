import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "../../../user/application/modules/users.module";
import { PropertyPostsController } from "@/real-state/presentation/controller";
import { PropertyPostsRepository } from "@/real-state/infrastructure/persistence/repositories/property-posts";
import { PropertyPostsService } from "../services/implementations/property-posts.service";
import { PropertyPostSchema } from "@/real-state/infrastructure/persistence/schemas";

const PropertyPostProvider: Provider = {
  provide: "IPropertyPostsService",
  useClass: PropertyPostsService,
};

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: "PropertyPost",
        schema: PropertyPostSchema,
      },
    ]),
  ],
  controllers: [PropertyPostsController],
  providers: [PropertyPostsRepository, PropertyPostProvider],
  exports: [PropertyPostsRepository, PropertyPostProvider],
})
export class PropertyPostModule {}
