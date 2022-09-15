import { AggregateRoot } from "@nestjs/cqrs";
import { IVehicleType } from "../types/i-vehicle-type";

export class VehicleType extends AggregateRoot {
  private vehicleType: IVehicleType;

  constructor(newVehicleType: IVehicleType) {
    super();

    this.vehicleType = newVehicleType;
  }

  public getId(): string {
    return this.vehicleType._id;
  }

  public getName(): string {
    return this.vehicleType.name;
  }

  public getCreatedAt(): Date {
    return this.vehicleType.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.vehicleType.updatedAt;
  }

  public updateVehicle(updatedType: IVehicleType): void {
    this.vehicleType = {
      ...this.vehicleType,
      name: updatedType.name || this.vehicleType.name,
    };
  }
}
