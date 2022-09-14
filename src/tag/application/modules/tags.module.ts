import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TagsService } from "../services/implementations/tags.service";
import { TagSchema } from "@/tag/infrastructure/persistence/schemas";
import { TagsController } from "@/tag/presentation/controllers";
import { TagsRepository } from "@/tag/infrastructure/persistence/repositories";

const TagsServiceProvider: Provider = {
  provide: "ITagsService",
  useClass: TagsService,
};

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Tag",
        schema: TagSchema,
      },
    ]),
  ],
  controllers: [TagsController],
  providers: [TagsRepository, TagsServiceProvider],
  exports: [TagsRepository, TagsServiceProvider],
})
export class TagsModule {}
