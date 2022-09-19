import { EntitySchemaFactory } from "@/common/infrastructure/persistence/factories";
import { Role } from "@/user/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { RoleSchema } from "../../persistence/schemas";

@Injectable()
export class RoleSchemaFactory
  implements EntitySchemaFactory<RoleSchema, Role>
{
  public create(role: Role): RoleSchema {
    return {
      _id: new Types.ObjectId(role.getId()),
      name: role.getName(),
      createdAt: role.getCreatedAt(),
      updatedAt: role.getUpdatedAt(),
    };
  }

  public createFromSchema(roleSchema: RoleSchema | null): Role | null {
    if (!roleSchema) return null;

    return new Role({
      ...roleSchema,
      _id: roleSchema._id.toHexString(),
    });
  }
}
