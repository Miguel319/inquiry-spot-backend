/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaginationQuery } from "@/common/domain/types";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { VehicleTypeDocument } from "@/vehicle-post/domain";
import { I18nContext } from "nestjs-i18n";
import { IVehicleTypesService } from "../../contracts/i-vehicle-type.service";

export class VehicleTypesService implements IVehicleTypesService {
  findAll(
    paginationQuery?: PaginationQuery | undefined,
    i18n?: I18nContext | undefined,
  ): Promise<PaginatedQuery<VehicleTypeDocument>> {
    throw new Error("Method not implemented.");
  }
  findById(
    _id: string,
    i18n?: I18nContext | undefined,
  ): Promise<VehicleTypeDocument> {
    throw new Error("Method not implemented.");
  }
  create?(
    entity: VehicleTypeDocument,
    i18n?: I18nContext | undefined,
  ): Promise<VehicleTypeDocument> {
    throw new Error("Method not implemented.");
  }
  update?(
    _id: string,
    entity: VehicleTypeDocument,
    i18n?: I18nContext | undefined,
  ): Promise<VehicleTypeDocument | null> {
    throw new Error("Method not implemented.");
  }
  delete?(_id: string, i18n?: I18nContext | undefined): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
