import { NameType } from "@/common/domain/entities";
import { IBaseEntity } from "@/common/domain/types";

export interface ITraction extends IBaseEntity {
  name: NameType;
}
