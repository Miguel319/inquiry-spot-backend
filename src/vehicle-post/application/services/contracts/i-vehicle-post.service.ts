import { PaginationQuery } from "@/domain/types";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { I18nContext } from "nestjs-i18n";
import { IBaseService } from "@/application/services/contracts";
import { VehiclePost, VehiclePostDocument } from "@/vehicle-post/domain";

export interface IVehiclePostsService
  extends IBaseService<VehiclePostDocument> {
  findAll(
    paginationQuery?: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<PaginatedQuery<VehiclePostDocument>>;

  findAllFromSeller(
    seller: string,
    paginationQuery: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<VehiclePost[]>;
}
