import { PropertyPostSchema } from "@/domain/entities";
import { PropertyPostsController } from "@/presentation/controllers";
import { PropertyPostsRepository } from "@/infrastructure/repositories";
import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PropertyPostsService } from "../services/implementations";
import { UsersModule } from "./users.module";

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
