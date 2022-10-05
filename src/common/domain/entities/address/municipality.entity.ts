import { IDefaultName, IMunicipality } from "@/common/domain/types";
import { AggregateRoot } from "@nestjs/cqrs";
import { Types } from "mongoose";

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

  public getSectors(): Types.ObjectId[] {
    return this.municipality.sectors;
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

  public removeSector(sectorId: Types.ObjectId): void {
    console.log("sectorId", sectorId);
    console.log("sectors", this.municipality.sectors);

    this.municipality.sectors = this.municipality.sectors.filter(
      (v) => String(v) !== String(sectorId),
    );

    console.log("this.municipality.sectors", this.municipality.sectors);
  }

  public pushNewSector(sectorId: Types.ObjectId): void {
    if (!this.municipality.sectors) this.municipality.sectors = [];

    const sectors = new Set<Types.ObjectId>(this.municipality.sectors);

    sectors.add(sectorId);

    this.municipality.sectors.push(sectorId);

    this.municipality.sectors = Array.from(sectors);
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
