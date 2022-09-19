import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { IRole } from "../types";

export class Role extends AggregateRoot {
  private vehicleType: IRole;

  constructor(newRole: IRole) {
    super();

    this.vehicleType = newRole;
  }

  public getId(): string {
    return this.vehicleType._id;
  }

  public getName(): NameType {
    return this.vehicleType.name;
  }

  public getCreatedAt(): Date {
    return this.vehicleType.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.vehicleType.updatedAt;
  }

  public updateRole(updatedType: IRole): void {
    this.vehicleType = {
      ...this.vehicleType,
      name: {
        en: updatedType.name.en || this.vehicleType.name.en,
        es: updatedType.name.es || this.vehicleType.name.es,
      },
    };
  }
}
