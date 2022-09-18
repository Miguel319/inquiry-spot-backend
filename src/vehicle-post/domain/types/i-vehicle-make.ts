import { IBaseEntity } from "@/common/domain/types";

export interface IVehicleMake extends IBaseEntity {
  readonly name: string;
}
