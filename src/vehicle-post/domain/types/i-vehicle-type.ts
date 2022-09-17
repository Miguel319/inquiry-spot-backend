import { NameType } from "@/common/domain/entities";
import { IBaseEntity } from "@/common/domain/types";

export interface IVehicleType extends IBaseEntity {
  readonly name: NameType;
}
