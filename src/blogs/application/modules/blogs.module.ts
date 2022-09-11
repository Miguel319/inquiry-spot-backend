import { UsersModule } from "@/application/modules/users.module";
import { BlogsController } from "@/blogs/infrastructure/controllers";
import { BlogFactory, BlogSchemaFactory } from "@/blogs/persistence/factories";
import { BlogEntityRepository } from "@/blogs/persistence/repositories";
import { BlogSchema } from "@/blogs/persistence/schemas";
import { LoggerService } from "@/common/infrastructure/logger";
import { forwardRef, Module } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { BlogsCommandHandlers } from "../commands";
import { BlogsEventHandler } from "../events";

@Module({
  imports: [
    forwardRef(() => UsersModule),
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
    BlogFactory,
    ...BlogsCommandHandlers,
    ...BlogsEventHandler,
  ],
  exports: [
    BlogEntityRepository,
    BlogSchemaFactory,
    BlogFactory,
    ...BlogsCommandHandlers,
    ...BlogsEventHandler,
  ],
})
export class BlogsModule {}
