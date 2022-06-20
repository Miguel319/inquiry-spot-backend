import { Module } from "@nestjs/common";
import { AuthModule } from "./auth.module";
import { DBModule } from "./db.module";
import { EmailsModule } from "./email.module";
import { EnvModule } from "./env.module";
import { InternationalizationModule } from "./internationalization.module";
import { LoggerModule } from "./logger.module";
import { PropertyPostModule } from "./property-post.module";
import { UsersModule } from "./users.module";
import { VehiclePostModule } from "./vehicle-post.module";

@Module({
  imports: [
    EnvModule,
    UsersModule,
    LoggerModule,
    InternationalizationModule,
    PropertyPostModule,
    AuthModule,
    EmailsModule,
    VehiclePostModule,
    DBModule,
  ],
})
export class RootModule {}
