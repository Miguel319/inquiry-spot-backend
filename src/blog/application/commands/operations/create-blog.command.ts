import { CreateBlogDto } from "@/blog/infrastructure/dtos";
import { User } from "@/domain/entities";
import { I18nContext } from "nestjs-i18n";

export class CreateBlogCommand {
  constructor(
    public readonly createBlogDto: CreateBlogDto,
    public readonly currentUser: User,
    public readonly i18n: I18nContext,
  ) {}
}
