import { IBaseEntity, IDefaultName } from "@/common/domain/types";

export interface ISector extends IBaseEntity {
  readonly name: string;
  municipality: IDefaultName;
}
