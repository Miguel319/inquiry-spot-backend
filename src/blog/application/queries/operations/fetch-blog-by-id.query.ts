import { I18nContext } from "nestjs-i18n";

export class FetchBlogByIdQuery {
  constructor(public readonly _id: string, public readonly i18n: I18nContext) {}
}
