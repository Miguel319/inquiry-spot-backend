import { IBlogValuesQuery } from "@/blogs/domain/types";
import { I18nContext } from "nestjs-i18n";

export class FetchPaginatedBlogsQuery {
  constructor(
    public readonly query: IBlogValuesQuery,
    public readonly i18n: I18nContext,
  ) {}
}
