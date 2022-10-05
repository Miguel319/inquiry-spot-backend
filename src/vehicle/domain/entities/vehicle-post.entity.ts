import {
  IAddress,
  IDefaultI18nName,
  IDefaultName,
  Price,
} from "@/common/domain/types";
import { AggregateRoot } from "@nestjs/cqrs";
import { ElectricValues, IVehiclePost } from "../types";

export class VehiclePost extends AggregateRoot {
  post: IVehiclePost;

  constructor(newPost: IVehiclePost) {
    super();

    this.post = newPost;
  }

  public getId(): string {
    return this.post._id;
  }

  public getDescription(): string {
    return this.post.description;
  }

  public getMake(): IDefaultName {
    return this.post.make;
  }

  public getModel(): string {
    return this.post.model;
  }

  public getType(): IDefaultI18nName {
    return this.post.type;
  }

  public getTransmission(): IDefaultI18nName {
    return this.post.transmission;
  }

  public getPrice(): Price {
    return this.post.price;
  }

  public getDoorCount(): number {
    return this.post.doorCount;
  }

  public getExteriorColor(): IDefaultI18nName {
    return this.post.exteriorColor;
  }

  public getInteriorColor(): IDefaultI18nName {
    return this.post.interiorColor;
  }

  public getTraction(): IDefaultI18nName {
    return this.post.traction;
  }

  public getTopSpeed(): string {
    return this.post.topSpeed;
  }

  public getFuelType(): IDefaultI18nName {
    return this.post.fuelType;
  }

  public getStatus(): IDefaultI18nName {
    return this.post.status;
  }

  public getUse(): string | undefined {
    return this.post?.use;
  }

  public getAccessories(): string[] {
    return this.post.accessories;
  }

  public getAddress(): { formal?: IAddress; informal?: string } {
    return this.post.address;
  }

  public getCylinders(): number {
    return this.post.cylinders;
  }

  public getSeller(): IDefaultName {
    return this.post.seller;
  }

  public getElectric(): ElectricValues {
    return this.post.electric;
  }

  public getPrimaryImage(): string {
    return this.post.primaryImage;
  }

  public getSecondaryImages(): string[] {
    return this.post.secondaryImages;
  }

  public getCreatedAt(): Date {
    return this.post.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.post.updatedAt;
  }
}
