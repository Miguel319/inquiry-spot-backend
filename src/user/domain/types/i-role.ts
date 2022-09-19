import { NameType } from "@/common/domain/entities";
import { IBaseEntity } from "@/common/domain/types";

export interface IRole extends IBaseEntity {
  readonly name: NameType;
}
