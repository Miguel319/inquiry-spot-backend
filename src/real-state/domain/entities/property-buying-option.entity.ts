import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { IPropertyBuyingOption } from "../types";

export class PropertyBuyingOption extends AggregateRoot {
  private vehicleType: IPropertyBuyingOption;

  constructor(newPropertyBuyingOption: IPropertyBuyingOption) {
    super();

    this.vehicleType = newPropertyBuyingOption;
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

  public updatePropertyBuyingOption(updatedType: IPropertyBuyingOption): void {
    this.vehicleType = {
      ...this.vehicleType,
      name: {
        en: updatedType.name.en || this.vehicleType.name.en,
        es: updatedType.name.es || this.vehicleType.name.es,
      },
    };
  }
}
