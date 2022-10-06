import { PaginationQuery } from "@/common/domain/types";
import { I18nContext } from "nestjs-i18n";

export class FetchPaginatedVehiclePostsQuery {
  constructor(
    public readonly query: PaginationQuery,
    public readonly i18n: I18nContext,
  ) {}
}
