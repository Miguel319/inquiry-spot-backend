import { Types } from "mongoose";
import { NameType } from "../../entities";

export interface IDefaultName {
  readonly _id: Types.ObjectId;
  readonly value: string;
}

export interface IDefaultI18nName {
  readonly _id: Types.ObjectId;
  readonly value: NameType;
}
