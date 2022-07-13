import { VehiclePost, VehiclePostDocument } from "@/domain/entities";
import { PaginationQuery } from "@/domain/types";
import { PaginatedQuery } from "@/infrastructure/common/util";
import { I18nContext } from "nestjs-i18n";
import { IBaseService } from "./i-base.service";

export interface IVehiclePostsService
  extends IBaseService<VehiclePostDocument> {
  findAll(
    paginationQuery?: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<PaginatedQuery<VehiclePostDocument>>;

  findFromSeller(
    id: string,
    seller: string,
    i18n?: I18nContext,
  ): Promise<VehiclePost>;

  findAllFromSeller(
    seller: string,
    paginationQuery: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<VehiclePost[]>;
}
