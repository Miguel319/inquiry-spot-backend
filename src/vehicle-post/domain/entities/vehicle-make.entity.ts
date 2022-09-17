import { NameType } from "@/common/domain/entities";
import { IVehicleMake } from "@/vehicle-post/domain/types";
import { AggregateRoot } from "@nestjs/cqrs";

export class VehicleMake extends AggregateRoot {
  private make: IVehicleMake;

  constructor(vehicleMake: IVehicleMake) {
    super();

    this.make = vehicleMake;
  }

  public getId(): string {
    return this.make._id;
  }

  public getName(): NameType {
    return this.make.name;
  }

  public getCreatedAt(): Date {
    return this.make.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.make.updatedAt;
  }

  public updateMake(updatedType: IVehicleMake): void {
    this.make = {
      ...this.make,
      name: {
        en: updatedType.name.en || this.make.name.en,
        es: updatedType.name.es || this.make.name.es,
      },
    };
  }
}
