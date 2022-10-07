import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { IColor } from "../types";

export class Color extends AggregateRoot {
  private color: IColor;

  constructor(newColor: IColor) {
    super();

    this.color = newColor;
  }

  public getId(): string {
    return this.color._id;
  }

  public getName(): NameType {
    return this.color.name;
  }

  public getHexValue(): string {
    return this.color.hexValue;
  }

  public getCreatedAt(): Date {
    return this.color.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.color.updatedAt;
  }

  public updateColor(updatedType: IColor): void {
    this.color = {
      ...this.color,
      name: {
        en: updatedType?.name?.en || this.color.name.en,
        es: updatedType?.name?.es || this.color.name.es,
      },
      hexValue: updatedType?.hexValue || this.color?.hexValue,
      updatedAt:
        updatedType?.name?.en !== this.color?.name?.en ||
        updatedType?.name?.es !== this.color?.name?.es
          ? new Date()
          : this.color?.updatedAt,
    };
  }
}
