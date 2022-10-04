import { IProvince } from "@/common/domain/types";
import { AggregateRoot } from "@nestjs/cqrs";
import { Types } from "mongoose";

export class Province extends AggregateRoot {
  private province: IProvince;

  constructor(newProvince: IProvince) {
    super();

    this.province = newProvince;
  }

  public getId(): string {
    return this.province._id;
  }

  public getName(): string {
    return this.province.name;
  }

  public getMunicipalities(): Types.ObjectId[] {
    return this.province.municipalities;
  }

  public removeMunicipality(municipalityId: Types.ObjectId): void {
    this.province.municipalities = this.province.municipalities.filter(
      (v) => String(v) !== String(municipalityId),
    );
  }

  public pushNewMunicipality(municipalityId: Types.ObjectId): void {
    if (!this.province.municipalities) this.province.municipalities = [];

    this.province.municipalities.push(municipalityId);
  }

  public getCreatedAt(): Date {
    return this.province.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.province.updatedAt;
  }

  public updateProvince(updatedType: IProvince): void {
    const shouldUpdateDate =
      updatedType.name !== this.province.name ||
      updatedType.municipalities !== this.province.municipalities;

    this.province = {
      ...this.province,
      name: updatedType.name || this.province.name,
      municipalities:
        updatedType.municipalities || this.province.municipalities,
      updatedAt: shouldUpdateDate ? new Date() : this.province.updatedAt,
    };
  }
}
