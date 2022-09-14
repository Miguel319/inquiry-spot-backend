import { UpdateBlogDto } from "@/blog/infrastructure/dtos";
import { User } from "@/user/infrastructure/persistence/schemas";
import { I18nContext } from "nestjs-i18n";

export class UpdateBlogCommand {
  constructor(
    public readonly valueToQuery: string,
    public readonly queryBy: "_id" | "slug",
    public readonly updateBlogDto: UpdateBlogDto,
    public readonly currentUser: User,
    public readonly i18n: I18nContext,
  ) {}
}
