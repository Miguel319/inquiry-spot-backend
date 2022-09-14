import { Module } from "@nestjs/common";
import { DBModule } from "./db.module";
import { EnvModule } from "./env.module";
import { InternationalizationModule } from "./internationalization.module";
import { LoggerModule } from "./logger.module";
import { VehiclePostModule } from "../../vehicle-post/application/modules/vehicle-post.module";
import { SellersModule } from "./sellers.module";
import { BlogsModule } from "@/blog/application/modules";
import { TagsModule } from "@/tag/application/modules";
import { AuthModule, UsersModule } from "@/user/application/modules";
import { PropertyPostModule } from "@/property-post/application/modules";
import { EmailsModule } from "@/email/application/modules";

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
