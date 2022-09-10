import { UserDocument } from "@/domain/entities";
import { PaginationQuery } from "@/domain/types";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { I18nContext } from "nestjs-i18n";

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
