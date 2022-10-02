import { IDefaultName, IMunicipality } from "@/common/domain/types";
import { AggregateRoot } from "@nestjs/cqrs";

export class Municipality extends AggregateRoot {
  private municipality: IMunicipality;

  constructor(newMunicipality: IMunicipality) {
    super();

    this.municipality = newMunicipality;
  }

  public getId(): string {
    return this.municipality._id;
  }

  public getName(): string {
    return this.municipality.name;
  }

  public getProvince(): IDefaultName {
    return this.municipality.province;
  }

  public getCreatedAt(): Date {
    return this.municipality.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.municipality.updatedAt;
  }

  public updateMunicipality(updatedType: IMunicipality): void {
    this.municipality = {
      ...this.municipality,
      name: updatedType.name || this.municipality.name,
      updatedAt:
        updatedType.name !== this.municipality.name
          ? new Date()
          : this.municipality.updatedAt,
    };
  }
}
