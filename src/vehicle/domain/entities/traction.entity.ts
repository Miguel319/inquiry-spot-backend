import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { ITraction } from "../types";

export class Traction extends AggregateRoot {
  private traction: ITraction;

  constructor(newTraction: ITraction) {
    super();

    this.traction = newTraction;
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

  public updateTraction(updatedType: ITraction): void {
    this.traction = {
      ...this.traction,
      name: {
        en: updatedType.name.en || this.traction.name.en,
        es: updatedType.name.es || this.traction.name.es,
      },
    };
  }
}
