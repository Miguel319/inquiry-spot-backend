import { IVehicleStatus } from "@/vehicle/domain/types";
import { AggregateRoot } from "@nestjs/cqrs";

export class VehicleStatus extends AggregateRoot {
  private make: IVehicleStatus;

  constructor(vehicleMake: IVehicleStatus) {
    super();

    this.make = vehicleMake;
  }

  public getId(): string {
    return this.make._id;
  }

  public getName(): string {
    return this.make.name;
  }

  public getCreatedAt(): Date {
    return this.make.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.make.updatedAt;
  }

  public updateMake(updatedType: IVehicleStatus): void {
    this.make = {
      ...this.make,
      name: updatedType.name || this.make.name,
    };
  }
}
