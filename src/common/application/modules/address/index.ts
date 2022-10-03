import { Module } from "@nestjs/common";
import { MunicipalityModule } from "./municipality.module";
import { ProvinceModule } from "./province.module";

@Module({
  imports: [ProvinceModule, MunicipalityModule],
})
export class AddressModule {}
