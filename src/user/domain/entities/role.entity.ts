import { NameType } from "@/common/domain/entities";
import { AggregateRoot } from "@nestjs/cqrs";
import { IRole } from "../types";

export class Role extends AggregateRoot {
  private role: IRole;

  constructor(newRole: IRole) {
    super();

    this.role = newRole;
  }

  public getId(): string {
    return this.role._id;
  }

  public getName(): NameType {
    return this.role.name;
  }

  public getCreatedAt(): Date {
    return this.role.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.role.updatedAt;
  }

  public updateRole(updatedType: IRole): void {
    this.role = {
      ...this.role,
      name: {
        en: updatedType.name.en || this.role.name.en,
        es: updatedType.name.es || this.role.name.es,
      },
      updatedAt:
        updatedType.name.en !== this.role.name.en ||
        updatedType.name.es !== this.role.name.es
          ? new Date()
          : this.role.updatedAt,
    };
  }
}
