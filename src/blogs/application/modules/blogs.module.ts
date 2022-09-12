import { UsersModule } from "@/application/modules/users.module";
import { BlogsController } from "@/blogs/presentation/controllers";
import {
  BlogFactory,
  BlogSchemaFactory,
} from "@/blogs/infrastructure/persistence/factories";
import {
  BlogDtoRepository,
  BlogEntityRepository,
} from "@/blogs/infrastructure/persistence/repositories";
import {
  BlogSchema,
  SchemaBlog,
} from "@/blogs/infrastructure/persistence/schemas";
import { LoggerService } from "@/common/infrastructure/logger";
import { Module } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { BlogsCommandHandlers } from "../commands";
import { BlogsEventHandler } from "../events";
import { BlogQueryHandlers } from "../queries/handlers";

@Module({
  imports: [
    UsersModule,
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: BlogSchema.name,
        schema: SchemaBlog,
      },
    ]),
  ],
  controllers: [BlogsController],
  providers: [
    BlogEntityRepository,
    BlogSchemaFactory,
    EventPublisher,
    BlogDtoRepository,
    LoggerService,
    BlogFactory,
    ...BlogQueryHandlers,
    ...BlogsCommandHandlers,
    ...BlogsEventHandler,
  ],
})
export class BlogsModule {}
