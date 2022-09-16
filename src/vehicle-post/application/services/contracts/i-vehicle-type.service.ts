import { PaginationQuery } from "@/common/domain/types/common";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { I18nContext } from "nestjs-i18n";
import { IBaseService } from "@/common/application/services/contracts";
import { VehicleTypeDocument } from "@/vehicle-post/domain";

export interface IVehicleTypesService
  extends IBaseService<VehicleTypeDocument> {
  findAll(
    paginationQuery?: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<PaginatedQuery<VehicleTypeDocument>>;
}
