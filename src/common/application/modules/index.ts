import { Module } from "@nestjs/common";
import { DBModule } from "./db.module";
import { EnvModule } from "./env.module";
import { InternationalizationModule } from "./internationalization.module";
import { LoggerModule } from "./logger.module";
import { SellersModule } from "./sellers.module";
import { BlogsModule } from "@/blog/application/modules";
import { TagsModule } from "@/tag/application/modules";
import { UsersGlobalModule } from "@/user/application/modules";
import { EmailsModule } from "@/email/application/modules";
import { VehiclesModule } from "@/vehicle/application/modules";
import { PropertiesModule } from "@/real-state/application/modules";

@Module({
  imports: [
    EnvModule,
    TagsModule,
    LoggerModule,
    InternationalizationModule,
    PropertiesModule,
    SellersModule,
    UsersGlobalModule,
    EmailsModule,
    BlogsModule,
    VehiclesModule,
    DBModule,
  ],
})
export class RootModule {}
