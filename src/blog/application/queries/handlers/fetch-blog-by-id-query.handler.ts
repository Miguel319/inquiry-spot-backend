import { BlogDto } from "@/blog/infrastructure/dtos";
import { BlogDtoRepository } from "@/blog/infrastructure/persistence/repositories";
import { BlogTranslations } from "@/domain/types";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { I18nService } from "nestjs-i18n";
import { FetchBlogByIdQuery } from "../operations";

@QueryHandler(FetchBlogByIdQuery)
export class FetchBlogByIdQueryHandler
  implements IQueryHandler<FetchBlogByIdQuery>
{
  constructor(
    private readonly _blogDtoRepository: BlogDtoRepository,
    private readonly _i18n: I18nService,
  ) {}

  async execute({ _id, i18n }: FetchBlogByIdQuery): Promise<BlogDto> {
    const blog = await this._blogDtoRepository.getById(_id);

    if (!blog)
      throw new NotFoundException(
        i18n
          ? i18n.t(BlogTranslations.NOT_FOUND)
          : this._i18n.t(BlogTranslations.NOT_FOUND),
      );

    return blog;
  }
}
