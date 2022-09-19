import { EntityFactory } from "@/common/infrastructure/persistence/factories";
import { RoleCreatedEvent } from "@/user/application/events";
import { Role } from "@/user/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { RoleSchema } from "../../persistence/schemas";

@Injectable()
export class RoleFactory implements EntityFactory<Role> {
  constructor(
    @InjectModel(RoleSchema.name)
    private readonly _roles: Model<RoleSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any): Promise<Role> {
    const role = new Role({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._roles.create(args[0]);

    role.apply(new RoleCreatedEvent(role.getId(), role.getName()));

    return role;
  }
}
