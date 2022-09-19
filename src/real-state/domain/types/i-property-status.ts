import { NameType } from "@/common/domain/entities";
import { IBaseEntity } from "@/common/domain/types";

export interface IPropertyStatus extends IBaseEntity {
  readonly name: NameType;
}
