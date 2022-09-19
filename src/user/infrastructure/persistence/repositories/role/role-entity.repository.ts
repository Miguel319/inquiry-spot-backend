import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { Role } from "@/user/domain/entities";
import { RoleSchemaFactory } from "@/user/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoleSchema } from "../../schemas";

@Injectable()
export class RoleEntityRepository extends BaseEntityRepository<
  RoleSchema,
  Role
> {
  constructor(
    @InjectModel(RoleSchema.name) role: Model<RoleSchema>,
    vehicleSchemaFactory: RoleSchemaFactory,
  ) {
    super(role, vehicleSchemaFactory);
  }
}
