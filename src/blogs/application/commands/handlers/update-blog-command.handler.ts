import { IBlog } from "@/blogs/domain/types";
import { BlogEntityRepository } from "@/blogs/infrastructure/persistence/repositories";
import { Blog, User } from "@/domain/entities";
import { BlogTranslations, SharedTranslations } from "@/domain/types";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateBlogCommand } from "../operations";

@CommandHandler(UpdateBlogCommand)
export class UpdateBlogHandler implements ICommandHandler<UpdateBlogCommand> {
  constructor(
    private readonly _blogEntityRepository: BlogEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private handleAuthorization(user: User, blog: Blog, i18n: I18nContext): void {
    const isPublisher: boolean =
      String(blog.getPostedBy()._id) === String(user._id);

    if (!isPublisher)
      throw new UnauthorizedException(
        i18n
          ? i18n.t(SharedTranslations.UNAUTHORIZED)
          : this._i18n.t(SharedTranslations.UNAUTHORIZED),
      );
  }

  async execute({
    queryBy,
    valueToQuery,
    updateBlogDto,
    currentUser,
    i18n,
  }: UpdateBlogCommand): Promise<void> {
    const blogFound = await this._blogEntityRepository.findByValue(
      valueToQuery,
      queryBy,
    );

    if (!blogFound)
      throw new NotFoundException(
        i18n
          ? i18n.t(BlogTranslations.NOT_FOUND)
          : this._i18n.t(BlogTranslations.NOT_FOUND),
      );

    this.handleAuthorization(currentUser, blogFound, i18n);

    const blog = this.eventPublisher.mergeObjectContext(blogFound);

    blog.updateBlog(updateBlogDto as unknown as IBlog);

    await this._blogEntityRepository.findOneAndReplaceByValue(
      valueToQuery,
      queryBy,
      blog,
    );

    blog.commit();
  }
}
