import { UsersModule } from "@/application/modules/users.module";
import { UsersService } from "@/application/services/implementations";
import { BlogsController } from "@/blogs/presentation/controllers";
import {
  BlogFactory,
  BlogSchemaFactory,
} from "@/blogs/infrastructure/persistence/factories";
import { BlogEntityRepository } from "@/blogs/infrastructure/persistence/repositories";
import { BlogSchema } from "@/blogs/infrastructure/persistence/schemas";
import { LoggerService } from "@/common/infrastructure/logger";
import { Module, Provider } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { BlogsCommandHandlers } from "../commands";
import { BlogsEventHandler } from "../events";
import { BlogQueryHandlers } from "../queries/handlers";

const UserUseCaseProvider: Provider = {
  provide: "IUsersService",
  useClass: UsersService,
};

@Module({
  imports: [
    UsersModule,
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: BlogSchema.name,
        schema: SchemaFactory.createForClass(BlogSchema),
      },
    ]),
  ],
  controllers: [BlogsController],
  providers: [
    BlogEntityRepository,
    BlogSchemaFactory,
    EventPublisher,
    LoggerService,
    UserUseCaseProvider,
    BlogFactory,
    ...BlogQueryHandlers,
    ...BlogsCommandHandlers,
    ...BlogsEventHandler,
  ],
  exports: [
    BlogEntityRepository,
    BlogSchemaFactory,
    BlogFactory,
    ...BlogQueryHandlers,
    ...BlogsCommandHandlers,
    ...BlogsEventHandler,
  ],
})
export class BlogsModule {}
