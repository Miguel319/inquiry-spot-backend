import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { IFuel } from "../types";

export class Fuel extends AggregateRoot {
  private traction: IFuel;

  constructor(newFuel: IFuel) {
    super();

    this.traction = newFuel;
  }

  public getId(): string {
    return this.traction._id;
  }

  public getName(): NameType {
    return this.traction.name;
  }

  public getCreatedAt(): Date {
    return this.traction.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.traction.updatedAt;
  }

  public updateFuel(updatedType: IFuel): void {
    this.traction = {
      ...this.traction,
      name: {
        en: updatedType.name.en || this.traction.name.en,
        es: updatedType.name.es || this.traction.name.es,
      },
    };
  }
}
