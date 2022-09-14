import { PaginationQuery } from "@/common/domain/types/common";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { I18nContext } from "nestjs-i18n";
import { UserDocument } from "@/user/infrastructure/persistence/schemas";

export interface ISellersService {
  findPropertyPostsSellers(
    paginationQuery?: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<PaginatedQuery<UserDocument>>;

  findVehiclePostSellers(
    paginationQuery?: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<PaginatedQuery<UserDocument>>;
}
