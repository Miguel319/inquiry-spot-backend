import { IBaseEntity } from "@/common/domain/types";
import { Types } from "mongoose";

export interface IProvince extends IBaseEntity {
  readonly name: string;
  readonly municipalities: Types.ObjectId[];
}
