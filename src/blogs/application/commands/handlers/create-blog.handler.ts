import { BlogFactory } from "@/blogs/persistence/factories/blog.factory";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateBlogCommand } from "../operations/create-blog.command";

@CommandHandler(CreateBlogCommand)
export class CreateBlogHandler implements ICommandHandler<CreateBlogCommand> {
  constructor(
    private readonly blogFactory: BlogFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createBlogDto }: CreateBlogCommand): Promise<void> {
    const blog = this.eventPublisher.mergeObjectContext(
      await this.blogFactory.create(createBlogDto),
    );

    blog.commit();
  }
}
