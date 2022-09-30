import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { IPropertyType } from "../types";

export class PropertyType extends AggregateRoot {
  private propertyType: IPropertyType;

  constructor(newPropertyType: IPropertyType) {
    super();

    this.propertyType = newPropertyType;
  }

  public getId(): string {
    return this.propertyType._id;
  }

  public getName(): NameType {
    return this.propertyType.name;
  }

  public getCreatedAt(): Date {
    return this.propertyType.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.propertyType.updatedAt;
  }

  public updatePropertyType(updatedType: IPropertyType): void {
    this.propertyType = {
      ...this.propertyType,
      name: {
        en: updatedType.name.en || this.propertyType.name.en,
        es: updatedType.name.es || this.propertyType.name.es,
      },
      updatedAt:
        updatedType.name.en !== this.propertyType.name.en ||
        updatedType.name.es !== this.propertyType.name.es
          ? new Date()
          : this.propertyType.updatedAt,
    };
  }
}
