import { IBaseEntity, IDefaultName } from "@/common/domain/types";

export interface IMunicipality extends IBaseEntity {
  readonly name: string;
  province: IDefaultName;
}
