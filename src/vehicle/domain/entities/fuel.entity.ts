import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { IFuel } from "../types";

export class Fuel extends AggregateRoot {
  private fuel: IFuel;

  constructor(newFuel: IFuel) {
    super();

    this.fuel = newFuel;
  }

  public getId(): string {
    return this.fuel._id;
  }

  public getName(): NameType {
    return this.fuel.name;
  }

  public getCreatedAt(): Date {
    return this.fuel.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.fuel.updatedAt;
  }

  public updateFuel(updatedType: IFuel): void {
    this.fuel = {
      ...this.fuel,
      name: {
        en: updatedType.name.en || this.fuel.name.en,
        es: updatedType.name.es || this.fuel.name.es,
      },
      updatedAt:
        updatedType.name.en !== this.fuel.name.en ||
        updatedType.name.es !== this.fuel.name.es
          ? new Date()
          : this.fuel.updatedAt,
    };
  }
}
