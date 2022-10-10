import {
  IAddress,
  IDefaultI18nName,
  IDefaultName,
  Price,
} from "@/common/domain/types/common";
import { Presenter } from "@/common/infrastructure/presenters";
import { PropertyPost } from "@/real-state/domain/entities";
import { IPropertyPost } from "@/real-state/domain/types/i-property-post";

export class AllPropertyPostsDto extends Presenter {
  readonly bathroomCount: number;
  readonly bedroomCount: number;
  readonly parkingLotCount: number;
  readonly price: Price;
  readonly seller: IDefaultName;
  readonly status: IDefaultI18nName;
  readonly interiorColor: IDefaultI18nName;
  readonly exteriorColor: IDefaultI18nName;
  readonly buyingOption: IDefaultI18nName;
  readonly type: IDefaultI18nName;
  readonly primaryImage: string;
  readonly address: {
    formal?: IAddress;
    informal?: string;
  };

  private constructor(post: PropertyPost | IPropertyPost) {
    super(post);

    this.address =
      (post as IPropertyPost)?.address ||
      (post as PropertyPost)?.getAddress?.();

    this.bathroomCount =
      (post as IPropertyPost)?.bathroomCount ||
      (post as PropertyPost)?.getBathroomCount?.();

    this.bedroomCount =
      (post as IPropertyPost)?.bedroomCount ||
      (post as PropertyPost)?.getBedroomCount?.();

    this.buyingOption =
      (post as IPropertyPost)?.buyingOption ||
      (post as PropertyPost)?.getBuyingOption?.();

    this.parkingLotCount =
      (post as IPropertyPost)?.parkingLotCount ||
      (post as PropertyPost)?.getParkingLotCount?.();

    this.price =
      (post as IPropertyPost)?.price || (post as PropertyPost)?.getPrice?.();

    this.primaryImage =
      (post as IPropertyPost)?.primaryImage ||
      (post as PropertyPost)?.getPrimaryImage?.();

    this.status =
      (post as IPropertyPost)?.status || (post as PropertyPost)?.getStatus?.();

    this.seller =
      (post as IPropertyPost)?.seller || (post as PropertyPost)?.getSeller?.();

    this.type =
      (post as IPropertyPost)?.type || (post as PropertyPost)?.getType?.();

    this.exteriorColor =
      (post as IPropertyPost)?.exteriorColor ||
      (post as PropertyPost)?.getExteriorColor?.();

    this.interiorColor =
      (post as IPropertyPost)?.interiorColor ||
      (post as PropertyPost)?.getInteriorColor?.();
  }

  public static create(
    propertyPost: PropertyPost | IPropertyPost,
  ): AllPropertyPostsDto {
    return new AllPropertyPostsDto(propertyPost);
  }
}
