import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { IPropertyType } from "../types";

export class PropertyType extends AggregateRoot {
  private vehicleType: IPropertyType;

  constructor(newPropertyType: IPropertyType) {
    super();

    this.vehicleType = newPropertyType;
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

  public updatePropertyType(updatedType: IPropertyType): void {
    this.vehicleType = {
      ...this.vehicleType,
      name: {
        en: updatedType.name.en || this.vehicleType.name.en,
        es: updatedType.name.es || this.vehicleType.name.es,
      },
    };
  }
}
