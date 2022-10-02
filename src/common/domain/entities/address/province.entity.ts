import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { IProvince } from "../../types";

export class Province extends AggregateRoot {
  private color: IProvince;

  constructor(newProvince: IProvince) {
    super();

    this.color = newProvince;
  }

  public getId(): string {
    return this.color._id;
  }

  public getName(): NameType {
    return this.color.name;
  }

  public getCreatedAt(): Date {
    return this.color.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.color.updatedAt;
  }

  public updateProvince(updatedType: IProvince): void {
    this.color = {
      ...this.color,
      name: {
        en: updatedType.name.en || this.color.name.en,
        es: updatedType.name.es || this.color.name.es,
      },
      updatedAt:
        updatedType.name.en !== this.color.name.en ||
        updatedType.name.es !== this.color.name.es
          ? new Date()
          : this.color.updatedAt,
    };
  }
}
