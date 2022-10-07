import { NameType } from "@/common/domain/entities";
import { IDefaultName } from "@/common/domain/types";
import { Presenter } from "@/common/infrastructure/presenters";
import { VehiclePost } from "@/vehicle/domain";
import { IVehiclePost } from "@/vehicle/domain/types";

export class AllVehiclePostsDto extends Presenter {
  readonly make: string;
  readonly model: string;
  readonly type: NameType;
  readonly price: string;
  readonly status: NameType;
  readonly topSpeed: string;
  readonly year: number;
  readonly fuelType: NameType;
  readonly primaryImage: string;
  readonly transmission: NameType;
  readonly seller: IDefaultName;

  private constructor(vehiclePost: VehiclePost | IVehiclePost) {
    super(vehiclePost);

    this.model =
      (vehiclePost as IVehiclePost)?.model ||
      (vehiclePost as VehiclePost)?.getModel?.();

    this.year =
      (vehiclePost as IVehiclePost)?.year ||
      (vehiclePost as VehiclePost)?.getYear?.();

    this.type =
      (vehiclePost as IVehiclePost)?.type?.value ||
      (vehiclePost as VehiclePost)?.getType?.()?.value;

    this.price = `${
      (vehiclePost as IVehiclePost)?.price?.currency ||
      (vehiclePost as VehiclePost)?.getPrice?.()?.currency
    } ${
      (vehiclePost as IVehiclePost)?.price?.value?.toLocaleString() ||
      (vehiclePost as VehiclePost)?.getPrice?.().value?.toLocaleString()
    }`;

    this.status = {
      en: (vehiclePost as IVehiclePost)?.status?.value?.en,
      es: (vehiclePost as IVehiclePost)?.status?.value?.es,
    } || {
      en: (vehiclePost as VehiclePost)?.getStatus?.()?.value?.en,
      es: (vehiclePost as VehiclePost)?.getStatus?.()?.value?.es,
    };

    this.topSpeed =
      (vehiclePost as IVehiclePost)?.topSpeed ||
      (vehiclePost as VehiclePost)?.getTopSpeed?.();

    this.fuelType =
      (vehiclePost as IVehiclePost)?.fuelType?.value ||
      (vehiclePost as VehiclePost)?.getFuelType?.().value;

    this.primaryImage =
      (vehiclePost as IVehiclePost)?.primaryImage ||
      (vehiclePost as VehiclePost)?.getPrimaryImage?.();

    this.transmission =
      (vehiclePost as IVehiclePost)?.transmission?.value ||
      (vehiclePost as VehiclePost)?.getTransmission().value;

    this.make =
      (vehiclePost as IVehiclePost)?.make?.value ||
      (vehiclePost as VehiclePost)?.getMake?.()?.value;

    this.seller =
      (vehiclePost as IVehiclePost)?.seller ||
      (vehiclePost as VehiclePost)?.getSeller?.();
  }

  public static create(
    vehiclePost: VehiclePost | IVehiclePost,
  ): AllVehiclePostsDto {
    return new AllVehiclePostsDto(vehiclePost);
  }
}
