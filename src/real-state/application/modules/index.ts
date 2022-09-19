import { Module } from "@nestjs/common";
import { PropertyBuyingOptionModule } from "./property-buying-option.module";
import { PropertyPostModule } from "./property-post.module";
import { PropertyStatusModule } from "./property-status.module";
import { PropertyTypeModule } from "./property-type.module";

@Module({
  imports: [
    PropertyTypeModule,
    PropertyPostModule,
    PropertyStatusModule,
    PropertyBuyingOptionModule,
  ],
})
export class PropertiesModule {}
