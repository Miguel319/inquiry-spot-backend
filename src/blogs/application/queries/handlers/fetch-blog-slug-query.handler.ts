import { BlogDto } from "@/blogs/infrastructure/dtos";
import { BlogDtoRepository } from "@/blogs/infrastructure/persistence/repositories";
import { BlogTranslations } from "@/domain/types";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchBlogBySlugQuery } from "../operations";

@QueryHandler(FetchBlogBySlugQuery)
export class FetchBlogBySlugQueryHandler
  implements IQueryHandler<FetchBlogBySlugQuery>
{
  constructor(
    private readonly _blogDtoRepository: BlogDtoRepository,
    private readonly _i18n: I18nService,
  ) {}

  async execute({ slug, i18n }: FetchBlogBySlugQuery): Promise<BlogDto> {
    const blog = await this._blogDtoRepository.getBySlug(slug);

    if (!blog)
      throw new NotFoundException(
        i18n
          ? i18n.t(BlogTranslations.NOT_FOUND)
          : this._i18n.t(BlogTranslations.NOT_FOUND),
      );

    return blog;
  }
}
