import {
  IAddress,
  IDefaultI18nName,
  IDefaultName,
  Price,
} from "@/common/domain/types";
import { AggregateRoot } from "@nestjs/cqrs";
import { IPropertyPost } from "../types";

export class PropertyPost extends AggregateRoot {
  post: IPropertyPost;

  constructor(newPost: IPropertyPost) {
    super();

    this.post = newPost;
  }

  public getId(): string {
    return this.post._id;
  }

  public getDescription(): string {
    return this.post.description;
  }

  public getBathroomCount(): number {
    return this.post.bathroomCount;
  }

  public getBedroomCount(): number {
    return this.post.bedroomCount;
  }

  public getParkingLotCount(): number {
    return this.post.parkingLotCount;
  }

  public getYearOfConstruction(): number {
    return this.post.yearOfConstruction;
  }

  public getLandSize(): string {
    return this.post.landSize;
  }

  public getPrice(): Price {
    return this.post.price;
  }

  public getType(): IDefaultI18nName {
    return this.post.type;
  }

  public getExteriorColor(): IDefaultI18nName {
    return this.post.exteriorColor;
  }

  public getInteriorColor(): IDefaultI18nName {
    return this.post.interiorColor;
  }

  public getAddress(): { formal?: IAddress; informal?: string } {
    return this.post.address;
  }

  public getSeller(): IDefaultName {
    return this.post.seller;
  }

  public getStatus(): IDefaultI18nName {
    return this.post.status;
  }

  public getPrimaryImage(): string {
    return this.post.primaryImage;
  }

  public getBuyingOption(): IDefaultI18nName {
    return this.post.buyingOption;
  }

  public getSecondaryImages(): string[] {
    return this.post.secondaryImages;
  }

  public getAdditionalInfo(): string[] {
    return this.post.additionalInfo;
  }

  public setInteriorColor(color: IDefaultI18nName): void {
    this.post.interiorColor = color;
  }

  public setExteriorColor(color: IDefaultI18nName): void {
    this.post.exteriorColor = color;
  }

  public setBuyingOption(buyingOption: IDefaultI18nName): void {
    this.post.buyingOption = buyingOption;
  }

  public setType(type: IDefaultI18nName): void {
    this.post.type = type;
  }

  public setStatus(status: IDefaultI18nName): void {
    this.post.status = status;
  }

  public getCreatedAt(): Date {
    return this.post.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.post.updatedAt;
  }

  public updatePropertyPost(updatePost: IPropertyPost): void {
    this.post = {
      ...this.post,
      additionalInfo: updatePost.additionalInfo || this.post.additionalInfo,
      bathroomCount: updatePost.bathroomCount || this.post.bathroomCount,
      bedroomCount: updatePost.bedroomCount || this.post.bedroomCount,
      description: updatePost.description || this.post.description,
      landSize: updatePost.landSize || this.post.landSize,
      price: updatePost.price || this.post.price,
      primaryImage: updatePost.primaryImage || this.post.primaryImage,
      secondaryImages: updatePost.secondaryImages || this.post.secondaryImages,
      parkingLotCount: updatePost.parkingLotCount || this.post.parkingLotCount,
      yearOfConstruction:
        updatePost.yearOfConstruction || this.post.yearOfConstruction,
      updatedAt: new Date(),
    };
  }
}
