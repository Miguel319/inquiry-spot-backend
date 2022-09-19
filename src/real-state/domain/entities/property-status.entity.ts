import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { IPropertyStatus } from "../types";

export class PropertyStatus extends AggregateRoot {
  private vehicleType: IPropertyStatus;

  constructor(newPropertyStatus: IPropertyStatus) {
    super();

    this.vehicleType = newPropertyStatus;
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

  public updatePropertyStatus(updatedType: IPropertyStatus): void {
    this.vehicleType = {
      ...this.vehicleType,
      name: {
        en: updatedType.name.en || this.vehicleType.name.en,
        es: updatedType.name.es || this.vehicleType.name.es,
      },
    };
  }
}
