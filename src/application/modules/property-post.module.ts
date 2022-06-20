import { PropertyPostSchema } from "@/domain/entities";
import { PropertyPostsRepository } from "@/infrastructure/repositories";
import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PropertyPostsService } from "../services/implementations";

const PropertyPostProvider: Provider = {
  provide: "IPropertyPostsService",
  useClass: PropertyPostsService,
};

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "PropertyPost",
        schema: PropertyPostSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [PropertyPostsRepository, PropertyPostProvider],
  exports: [PropertyPostsRepository, PropertyPostProvider],
})
export class PropertyPostModule {}
