import {
  IAddress,
  IBaseEntity,
  IDefaultI18nName,
  IDefaultName,
  Price,
} from "@/common/domain/types";
import { ElectricValues } from "./electric-values";

export interface IVehiclePost extends IBaseEntity {
  readonly description: string;
  readonly make: IDefaultName;
  readonly model: string;
  type: IDefaultI18nName;
  readonly transmission: IDefaultI18nName;
  readonly price: Price;
  readonly doorCount: number;
  exteriorColor: IDefaultI18nName;
  interiorColor: IDefaultI18nName;
  traction: IDefaultI18nName;
  readonly topSpeed: string;
  fuelType: IDefaultI18nName;
  status: IDefaultI18nName;
  readonly use?: string;
  readonly accessories: string[];
  readonly address: {
    formal?: IAddress;
    informal?: string;
  };
  readonly cylinders: number;
  readonly seller: IDefaultName;
  readonly electric: ElectricValues;
  readonly primaryImage: string;
  readonly secondaryImages: string[];
}
