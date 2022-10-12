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

  public getYear(): number {
    return this.post.year;
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

  public getExteriorColor(): IDefaultI18nName & { hexValue: string } {
    return this.post.exteriorColor;
  }

  public getInteriorColor(): IDefaultI18nName & { hexValue: string } {
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

  public getElectric(): ElectricValues | null {
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

  public setMake(make: IDefaultName): void {
    this.post.make = make;
  }

  public setStatus(status: IDefaultI18nName): void {
    this.post.status = status;
  }

  public setFuelType(fuel: IDefaultI18nName): void {
    this.post.fuelType = fuel;
  }

  public setType(type: IDefaultI18nName): void {
    this.post.type = type;
  }

  public setInteriorColor(
    color: IDefaultI18nName & { hexValue: string },
  ): void {
    this.post.interiorColor = color;
  }

  public setExteriorColor(
    color: IDefaultI18nName & { hexValue: string },
  ): void {
    this.post.exteriorColor = color;
  }

  public setTransmission(transmission: IDefaultI18nName): void {
    this.post.transmission = transmission;
  }

  public setTraction(traction: IDefaultI18nName): void {
    this.post.traction = traction;
  }

  public setFormalAddress(address: IAddress): void {
    this.post.address.formal = address;
  }

  public setInformalAddress(address: string): void {
    this.post.address.informal = address;
  }

  public updateVehiclePost(updatedPost: IVehiclePost): void {
    this.post = {
      ...this.post,
      accessories: updatedPost?.accessories || this.post.accessories,
      doorCount: updatedPost.doorCount || this.post.doorCount,
      cylinders: updatedPost.cylinders || this.post.cylinders,
      electric: updatedPost.electric || this.post.electric,
      model: updatedPost.model || this.post.model,
      price: updatedPost.price || this.post.price,
      primaryImage: updatedPost.primaryImage || this.post.primaryImage,
      secondaryImages: updatedPost.secondaryImages || this.post.secondaryImages,
      topSpeed: updatedPost.topSpeed || this.post.topSpeed,
      use: updatedPost.use || this.post.use,
      year: updatedPost.year || this.post.year,
      description: updatedPost.description || this.post.description,
      updatedAt: new Date(),
    };
  }
}
