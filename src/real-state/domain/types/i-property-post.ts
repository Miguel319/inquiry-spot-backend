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
  readonly seller: IDefaultName;
  readonly buyingOption: IDefaultI18nName;
  readonly type: IDefaultI18nName;
  readonly primaryImage: string;
  readonly secondaryImages: string[];
  readonly additionalInfo: string[];
  readonly address: {
    formal: IAddress;
    informal: string;
  };
}
