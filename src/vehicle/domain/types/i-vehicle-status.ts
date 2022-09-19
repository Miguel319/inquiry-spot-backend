import { IBaseEntity } from "@/common/domain/types";

export interface IVehicleStatus extends IBaseEntity {
  readonly name: string;
}
