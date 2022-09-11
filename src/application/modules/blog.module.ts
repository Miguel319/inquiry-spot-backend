import { BlogsController } from "@/presentation/controllers/blogs/blogs.controller";
import { BlogRepository } from "@/infrastructure/repositories";
import { forwardRef, Module, Provider } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BlogsService } from "../services/implementations";
import { UsersModule } from "./users.module";
import { BlogSchema } from "@/blogs/persistence/schemas";

const BlogServiceProvider: Provider = {
  provide: "IBlogsService",
  useClass: BlogsService,
};

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      {
        name: "Blog",
        schema: BlogSchema,
      },
    ]),
  ],
  controllers: [BlogsController],
  providers: [BlogRepository, BlogServiceProvider],
  exports: [BlogRepository, BlogServiceProvider],
})
export class BlogsModule {}
