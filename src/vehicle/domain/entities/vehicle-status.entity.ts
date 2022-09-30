import { NameType } from "@/common/domain/entities";
import { IVehicleStatus } from "@/vehicle/domain/types";
import { AggregateRoot } from "@nestjs/cqrs";

export class VehicleStatus extends AggregateRoot {
  private vehicleStatus: IVehicleStatus;

  constructor(vehicleMake: IVehicleStatus) {
    super();

    this.vehicleStatus = vehicleMake;
  }

  public getId(): string {
    return this.vehicleStatus._id;
  }

  public getName(): NameType {
    return this.vehicleStatus.name;
  }

  public getCreatedAt(): Date {
    return this.vehicleStatus.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.vehicleStatus.updatedAt;
  }

  public updateVehicleStatus(updatedType: IVehicleStatus): void {
    this.vehicleStatus = {
      ...this.vehicleStatus,
      name: {
        en: updatedType.name.en || this.vehicleStatus.name.en,
        es: updatedType.name.es || this.vehicleStatus.name.es,
      },
      updatedAt:
        updatedType.name.en !== this.vehicleStatus.name.en ||
        updatedType.name.es !== this.vehicleStatus.name.es
          ? new Date()
          : this.vehicleStatus.updatedAt,
    };
  }
}
