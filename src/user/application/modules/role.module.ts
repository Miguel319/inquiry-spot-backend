import { LoggerService } from "@/common/infrastructure/logger";

import {
  RoleFactory,
  RoleSchemaFactory,
} from "@/user/infrastructure/factories";
import {
  UsersRepository,
  RoleDtoRepository,
  RoleEntityRepository,
} from "@/user/infrastructure/persistence/repositories";
import {
  RoleSchema,
  SchemaRole,
  User,
  UserSchema,
} from "@/user/infrastructure/persistence/schemas";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleCommandHandlers } from "../commands/handlers";
import { RoleEventHandlers } from "../events/handlers";
import { RolesQueryHandlers } from "../queries/handlers";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: RoleSchema.name,
        schema: SchemaRole,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    RoleEntityRepository,
    RoleSchemaFactory,
    RoleDtoRepository,
    LoggerService,
    RoleFactory,
    UsersRepository,
    ...RolesQueryHandlers,
    ...RoleCommandHandlers,
    ...RoleEventHandlers,
  ],
})
export class RoleModule {}
