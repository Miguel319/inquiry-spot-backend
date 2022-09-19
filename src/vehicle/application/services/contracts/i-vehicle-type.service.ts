import { PaginationQuery } from "@/common/domain/types/common";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { I18nContext } from "nestjs-i18n";
import {
  CreateVehicleTypeDto,
  UpdateVehicleTypeDto,
  VehicleTypeDto,
} from "@/vehicle/infrastructure/dtos";

export interface IVehicleTypesService {
  findAll(
    paginationQuery?: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<PaginatedQuery<VehicleTypeDto>>;

  findById(_id: string, i18n?: I18nContext): Promise<VehicleTypeDto>;
  create(entity: CreateVehicleTypeDto, i18n?: I18nContext): Promise<void>;
  update(
    _id: string,
    entity: UpdateVehicleTypeDto,
    i18n?: I18nContext,
  ): Promise<void>;
  delete(_id: string, i18n?: I18nContext): Promise<boolean>;
}
