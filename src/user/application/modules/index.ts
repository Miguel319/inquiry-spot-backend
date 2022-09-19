import { Module } from "@nestjs/common";
import { AuthModule } from "./auth.module";
import { RoleModule } from "./role.module";
import { UsersModule } from "./users.module";

export { AuthModule } from "./auth.module";
export { UsersModule } from "./users.module";

@Module({
  imports: [RoleModule, AuthModule, UsersModule],
})
export class UsersGlobalModule {}
