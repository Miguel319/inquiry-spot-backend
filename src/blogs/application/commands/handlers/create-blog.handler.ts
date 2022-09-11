import { BlogFactory } from "@/blogs/persistence/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateBlogCommand } from "../operations";

@CommandHandler(CreateBlogCommand)
export class CreateBlogHandler implements ICommandHandler<CreateBlogCommand> {
  constructor(
    private readonly blogFactory: BlogFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createBlogDto,
    currentUser,
    i18n,
  }: CreateBlogCommand): Promise<void> {
    const blog = this.eventPublisher.mergeObjectContext(
      await this.blogFactory.create(createBlogDto, currentUser, i18n),
    );

    blog.commit();
  }
}
