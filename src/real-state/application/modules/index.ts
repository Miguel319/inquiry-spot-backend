import { Module } from "@nestjs/common";
import { PropertyPostModule } from "./property-post.module";
import { PropertyStatusModule } from "./property-status.module";
import { PropertyTypeModule } from "./property-type.module";

@Module({
  imports: [PropertyTypeModule, PropertyPostModule, PropertyStatusModule],
})
export class PropertiesModule {}
