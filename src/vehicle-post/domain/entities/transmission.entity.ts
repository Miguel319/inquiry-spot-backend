import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { ITransmission } from "../types";

export class Transmission extends AggregateRoot {
  private transmission: ITransmission;

  constructor(newTransmission: ITransmission) {
    super();

    this.transmission = newTransmission;
  }

  public getId(): string {
    return this.transmission._id;
  }

  public getName(): NameType {
    return this.transmission.name;
  }

  public getCreatedAt(): Date {
    return this.transmission.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.transmission.updatedAt;
  }

  public updateTransmission(updatedType: ITransmission): void {
    this.transmission = {
      ...this.transmission,
      name: {
        en: updatedType.name.en || this.transmission.name.en,
        es: updatedType.name.es || this.transmission.name.es,
      },
    };
  }
}
