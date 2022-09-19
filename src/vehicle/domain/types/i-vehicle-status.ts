import { NameType } from "@/common/domain/entities";
import { IBaseEntity } from "@/common/domain/types";

export interface IVehicleStatus extends IBaseEntity {
  readonly name: NameType;
}
