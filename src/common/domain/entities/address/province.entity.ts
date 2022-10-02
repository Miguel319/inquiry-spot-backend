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

  public getCreatedAt(): Date {
    return this.province.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.province.updatedAt;
  }

  public updateProvince(updatedType: IProvince): void {
    this.province = {
      ...this.province,
      name: updatedType.name || this.province.name,
      updatedAt:
        updatedType.name !== this.province.name
          ? new Date()
          : this.province.updatedAt,
    };
  }
}
