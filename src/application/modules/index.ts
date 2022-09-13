import { Module } from "@nestjs/common";
import { AuthModule } from "./auth.module";
import { DBModule } from "./db.module";
import { EmailsModule } from "../../email/application/modules/email.module";
import { EnvModule } from "./env.module";
import { InternationalizationModule } from "./internationalization.module";
import { LoggerModule } from "./logger.module";
import { PropertyPostModule } from "../../property-post/application/modules/property-post.module";
import { UsersModule } from "./users.module";
import { VehiclePostModule } from "../../vehicle-post/application/modules/vehicle-post.module";
import { SellersModule } from "./sellers.module";
import { TagsModule } from "./tags.module";
import { BlogsModule } from "@/blog/application/modules";

@Module({
  imports: [
    EnvModule,
    TagsModule,
    UsersModule,
    LoggerModule,
    InternationalizationModule,
    PropertyPostModule,
    SellersModule,
    AuthModule,
    EmailsModule,
    BlogsModule,
    VehiclePostModule,
    DBModule,
  ],
})
export class RootModule {}
