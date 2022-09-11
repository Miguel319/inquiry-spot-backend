import { UpdateBlogDto } from "@/blogs/infrastructure/dtos";
import { User } from "@/domain/entities";
import { I18nContext } from "nestjs-i18n";

export class UpdateBlogCommand {
  constructor(
    public readonly _id: string,
    public readonly updateBlogDto: UpdateBlogDto,
    public readonly currentUser: User,
    public readonly i18n: I18nContext,
  ) {}
}
