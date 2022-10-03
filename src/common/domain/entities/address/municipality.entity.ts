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

  public setProvince(province: IDefaultName): void {
    this.municipality.province = province;
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
      province: updatedType.province || this.municipality.province,
      updatedAt:
        updatedType.name !== this.municipality.name ||
        updatedType.province !== this.municipality.province
          ? new Date()
          : this.municipality.updatedAt,
    };
  }
}
