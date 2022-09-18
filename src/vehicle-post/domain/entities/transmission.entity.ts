import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { ITransmission } from "../types";

export class Transmission extends AggregateRoot {
  private vehicleType: ITransmission;

  constructor(newTransmission: ITransmission) {
    super();

    this.vehicleType = newTransmission;
  }

  public getId(): string {
    return this.vehicleType._id;
  }

  public getName(): NameType {
    return this.vehicleType.name;
  }

  public getCreatedAt(): Date {
    return this.vehicleType.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.vehicleType.updatedAt;
  }

  public updateTransmission(updatedType: ITransmission): void {
    this.vehicleType = {
      ...this.vehicleType,
      name: {
        en: updatedType.name.en || this.vehicleType.name.en,
        es: updatedType.name.es || this.vehicleType.name.es,
      },
    };
  }
}
