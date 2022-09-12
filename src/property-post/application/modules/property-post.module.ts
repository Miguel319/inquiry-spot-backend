import { PropertyPostSchema } from "@/domain/entities";
import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PropertyPostsService } from "../../../application/services/implementations";
import { UsersModule } from "../../../application/modules/users.module";
import { PropertyPostsController } from "@/property-post/presentation/controller";
import { PropertyPostsRepository } from "@/property-post/infrastructure/persistence/repositories";

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
