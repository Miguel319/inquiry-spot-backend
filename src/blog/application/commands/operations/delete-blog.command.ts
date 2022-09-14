import { User } from "@/user/infrastructure/persistence/schemas";
import { I18nContext } from "nestjs-i18n";

export class DeleteBlogCommand {
  constructor(
    public readonly valueToQuery: string,
    public readonly queryBy: "slug" | "_id",
    public readonly user: User,
    public readonly i18n: I18nContext,
  ) {}
}
