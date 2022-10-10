import { PaginationQuery } from "@/common/domain/types";
import { I18nContext } from "nestjs-i18n";

export class FetchPropertyPostsFromSellerQuery {
  constructor(
    public readonly seller: string,
    public readonly query: PaginationQuery,
    public readonly i18n: I18nContext,
  ) {}
}
