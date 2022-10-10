import { BaseEntity } from "@/common/domain/entities";
import {
  IAddress,
  IDefaultI18nName,
  IDefaultName,
  Price,
} from "@/common/domain/types";

export interface IPropertyPost extends BaseEntity {
  readonly description: string;
  readonly bathroomCount: number;
  readonly bedroomCount: number;
  readonly parkingLotCount: number;
  readonly yearOfConstruction: number;
  readonly landSize: string;
  readonly price: Price;
  seller: IDefaultName;
  status: IDefaultI18nName;
  interiorColor: IDefaultI18nName;
  exteriorColor: IDefaultI18nName;
  buyingOption: IDefaultI18nName;
  type: IDefaultI18nName;
  readonly primaryImage: string;
  readonly secondaryImages: string[];
  readonly additionalInfo: string[];
  readonly address: {
    formal?: IAddress;
    informal?: string;
  };
}
