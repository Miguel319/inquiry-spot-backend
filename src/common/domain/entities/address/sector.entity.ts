import { IDefaultName, ISector } from "@/common/domain/types";
import { AggregateRoot } from "@nestjs/cqrs";

export class Sector extends AggregateRoot {
  private sector: ISector;

  constructor(newSector: ISector) {
    super();

    this.sector = newSector;
  }

  public getId(): string {
    return this.sector._id;
  }

  public getName(): string {
    return this.sector.name;
  }

  public setMunicipality(municipality: IDefaultName): void {
    this.sector.municipality = municipality;
  }

  public getMunicipality(): IDefaultName {
    return this.sector.municipality;
  }

  public getCreatedAt(): Date {
    return this.sector.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.sector.updatedAt;
  }

  public updateSector(updatedType: ISector): void {
    this.sector = {
      ...this.sector,
      name: updatedType.name || this.sector.name,
      municipality: updatedType.municipality || this.sector.municipality,
      updatedAt:
        updatedType.name !== this.sector.name ||
        updatedType.municipality !== this.sector.municipality
          ? new Date()
          : this.sector.updatedAt,
    };
  }
}
