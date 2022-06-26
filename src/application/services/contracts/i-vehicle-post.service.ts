import { VehiclePost } from "@/domain/entities";
import { PaginationQuery } from "@/domain/types";
import { I18nContext } from "nestjs-i18n";
import { IBaseService } from "./i-base.service";

export interface IVehiclePostsService extends IBaseService<VehiclePost> {
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
