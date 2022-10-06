/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IAddress,
  IDefaultI18nName,
  IDefaultName,
  Price,
} from "@/common/domain/types/common";
import { VehiclePost } from "@/vehicle/domain/entities";
import { ElectricValues } from "@/vehicle/domain/types";
import { Presenter } from "../../../../common/infrastructure/presenters";

export class VehiclePostDto extends Presenter {
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
  readonly year: number;
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

  private constructor(vehiclePost: VehiclePost) {
    super(vehiclePost);

    this.accessories =
      (vehiclePost as any)?.accessories || vehiclePost.getAccessories?.();
    this.description =
      (vehiclePost as any)?.description || vehiclePost.getDescription?.();
    this.doorCount =
      (vehiclePost as any)?.doorCount || vehiclePost.getDoorCount?.();
    this.electric =
      (vehiclePost as any)?.electric || vehiclePost.getElectric?.();
    this.exteriorColor =
      (vehiclePost as any)?.exteriorColor || vehiclePost.getExteriorColor?.();
    this.fuelType =
      (vehiclePost as any)?.fuelType || vehiclePost.getFuelType?.();
    this.interiorColor =
      (vehiclePost as any)?.interiorColor || vehiclePost.getInteriorColor?.();
    this.make = (vehiclePost as any)?.make || vehiclePost.getMake?.();
    this.address = (vehiclePost as any)?.address || vehiclePost.getAddress?.();
    this.model = (vehiclePost as any)?.model || vehiclePost.getModel?.();
    this.price = (vehiclePost as any)?.price || vehiclePost.getPrice?.();
    this.primaryImage =
      (vehiclePost as any)?.primaryImage || vehiclePost.getPrimaryImage?.();
    this.secondaryImages =
      (vehiclePost as any)?.secondaryImages ||
      vehiclePost.getSecondaryImages?.();
    this.seller = (vehiclePost as any)?.seller || vehiclePost.getSeller?.();
    this.status = (vehiclePost as any)?.status || vehiclePost.getStatus?.();
    this.topSpeed =
      (vehiclePost as any)?.topSpeed || vehiclePost.getTopSpeed?.();
    this.traction =
      (vehiclePost as any)?.traction || vehiclePost.getTraction?.();
    this.transmission =
      (vehiclePost as any)?.transmission || vehiclePost.getTransmission?.();
    this.type = (vehiclePost as any)?.type || vehiclePost.getType?.();
  }

  public static create(vehiclePost: VehiclePost): VehiclePostDto {
    return new VehiclePostDto(vehiclePost);
  }
}
