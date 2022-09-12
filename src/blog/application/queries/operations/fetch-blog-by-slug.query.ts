import { I18nContext } from "nestjs-i18n";

export class FetchBlogBySlugQuery {
  constructor(
    public readonly slug: string,
    public readonly i18n: I18nContext,
  ) {}
}
