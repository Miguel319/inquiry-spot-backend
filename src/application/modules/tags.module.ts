import { TagSchema } from "@/domain/entities";
import { TagsController } from "@/presentation/controllers";
import { TagsRepository } from "@/infrastructure/repositories";
import { Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TagsService } from "../../tag/application/services/implementations/tags.service";

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
