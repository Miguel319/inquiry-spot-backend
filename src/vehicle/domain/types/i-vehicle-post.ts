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
  make: IDefaultName;
  readonly model: string;
  type: IDefaultI18nName;
  transmission: IDefaultI18nName;
  readonly price: Price;
  readonly doorCount: number;
  readonly year: number;
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
  seller: IDefaultName;
  readonly electric: ElectricValues | null;
  readonly primaryImage: string;
  readonly secondaryImages: string[];
}
