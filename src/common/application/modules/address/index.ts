import { Module } from "@nestjs/common";
import { ProvinceModule } from "./province.module";

@Module({
  imports: [ProvinceModule],
})
export class AddressModule {}
