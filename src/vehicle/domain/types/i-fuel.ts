import { NameType } from "@/common/domain/entities";
import { IBaseEntity } from "@/common/domain/types";

export interface IFuel extends IBaseEntity {
  name: NameType;
}
