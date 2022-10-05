import { IBaseEntity, IDefaultName } from "@/common/domain/types";
import { Types } from "mongoose";

export interface IMunicipality extends IBaseEntity {
  readonly name: string;
  province: IDefaultName;
  sectors: Types.ObjectId[];
}
