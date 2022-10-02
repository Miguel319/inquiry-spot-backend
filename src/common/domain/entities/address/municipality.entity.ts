import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { IMunicipality } from "../../types";

export class Municipality extends AggregateRoot {
  private province: IMunicipality;

  constructor(newMunicipality: IMunicipality) {
    super();

    this.province = newMunicipality;
  }

  public getId(): string {
    return this.province._id;
  }

  public getName(): NameType {
    return this.province.name;
  }

  public getCreatedAt(): Date {
    return this.province.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.province.updatedAt;
  }

  public updateMunicipality(updatedType: IMunicipality): void {
    this.province = {
      ...this.province,
      name: {
        en: updatedType.name.en || this.province.name.en,
        es: updatedType.name.es || this.province.name.es,
      },
      updatedAt:
        updatedType.name.en !== this.province.name.en ||
        updatedType.name.es !== this.province.name.es
          ? new Date()
          : this.province.updatedAt,
    };
  }
}
