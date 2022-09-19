import { Module } from "@nestjs/common";
import { PropertyPostModule } from "./property-post.module";
import { PropertyTypeModule } from "./vehicle-type.module";

@Module({ imports: [PropertyTypeModule, PropertyPostModule] })
export class PropertiesModule {}
