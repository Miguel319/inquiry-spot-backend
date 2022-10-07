import {
  IAddress,
  IDefaultI18nName,
  IDefaultName,
  Price,
} from "@/common/domain/types/common";
import { VehiclePost } from "@/vehicle/domain/entities";
import { ElectricValues, IVehiclePost } from "@/vehicle/domain/types";
import { Presenter } from "../../../../common/infrastructure/presenters";

export class VehiclePostDto extends Presenter {
  readonly description: string;
  readonly make: IDefaultName;
  readonly model: string;
  readonly type: IDefaultI18nName;
  readonly transmission: IDefaultI18nName;
  readonly price: Price;
  readonly doorCount: number;
  readonly exteriorColor: IDefaultI18nName;
  readonly interiorColor: IDefaultI18nName;
  readonly traction: IDefaultI18nName;
  readonly topSpeed: string;
  readonly fuelType: IDefaultI18nName;
  readonly status: IDefaultI18nName;
  readonly year: number;
  readonly use?: string;
  readonly accessories: string[];
  readonly address: {
    formal?: IAddress;
    informal?: string;
  };
  readonly cylinders: number;
  readonly seller: IDefaultName;
  readonly electric: ElectricValues | null;
  readonly primaryImage: string;
  readonly secondaryImages: string[];

  private constructor(vehiclePost: VehiclePost | IVehiclePost) {
    super(vehiclePost);

    this.accessories =
      (vehiclePost as IVehiclePost)?.accessories ||
      (vehiclePost as VehiclePost)?.getAccessories?.();
    this.description =
      (vehiclePost as IVehiclePost)?.description ||
      (vehiclePost as VehiclePost)?.getDescription?.();
    this.doorCount =
      (vehiclePost as IVehiclePost)?.doorCount ||
      (vehiclePost as VehiclePost)?.getDoorCount?.();
    this.electric =
      (vehiclePost as IVehiclePost)?.electric ||
      (vehiclePost as VehiclePost)?.getElectric?.();
    this.exteriorColor =
      (vehiclePost as IVehiclePost)?.exteriorColor ||
      (vehiclePost as VehiclePost)?.getExteriorColor?.();
    this.fuelType =
      (vehiclePost as IVehiclePost)?.fuelType ||
      (vehiclePost as VehiclePost)?.getFuelType?.();
    this.interiorColor =
      (vehiclePost as IVehiclePost)?.interiorColor ||
      (vehiclePost as VehiclePost)?.getInteriorColor?.();
    this.make =
      (vehiclePost as IVehiclePost)?.make ||
      (vehiclePost as VehiclePost)?.getMake?.();
    this.address =
      (vehiclePost as IVehiclePost)?.address ||
      (vehiclePost as VehiclePost)?.getAddress?.();
    this.model =
      (vehiclePost as IVehiclePost)?.model ||
      (vehiclePost as VehiclePost)?.getModel?.();
    this.price =
      (vehiclePost as IVehiclePost)?.price ||
      (vehiclePost as VehiclePost)?.getPrice?.();

    this.year =
      (vehiclePost as IVehiclePost)?.year ||
      (vehiclePost as VehiclePost)?.getYear?.();

    this.primaryImage =
      (vehiclePost as IVehiclePost)?.primaryImage ||
      (vehiclePost as VehiclePost)?.getPrimaryImage?.();
    this.secondaryImages =
      (vehiclePost as IVehiclePost)?.secondaryImages ||
      (vehiclePost as VehiclePost)?.getSecondaryImages?.();
    this.seller =
      (vehiclePost as IVehiclePost)?.seller ||
      (vehiclePost as VehiclePost)?.getSeller?.();
    this.status =
      (vehiclePost as IVehiclePost)?.status ||
      (vehiclePost as VehiclePost)?.getStatus?.();
    this.topSpeed =
      (vehiclePost as IVehiclePost)?.topSpeed ||
      (vehiclePost as VehiclePost)?.getTopSpeed?.();
    this.traction =
      (vehiclePost as IVehiclePost)?.traction ||
      (vehiclePost as VehiclePost)?.getTraction?.();
    this.transmission =
      (vehiclePost as IVehiclePost)?.transmission ||
      (vehiclePost as VehiclePost)?.getTransmission?.();
    this.type =
      (vehiclePost as IVehiclePost)?.type ||
      (vehiclePost as VehiclePost)?.getType?.();
  }

  public static create(vehiclePost: VehiclePost): VehiclePostDto {
    return new VehiclePostDto(vehiclePost);
  }
}
