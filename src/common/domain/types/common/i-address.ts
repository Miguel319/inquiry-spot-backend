import { IDefaultName } from "..";

export interface IAddress {
  addressLine1: string;
  municipality: IDefaultName;
  province: IDefaultName;
  sector: IDefaultName;
}
