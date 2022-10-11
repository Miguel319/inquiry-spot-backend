import { Module } from "@nestjs/common";
import { MunicipalityModule } from "./municipality.module";
import { ProvinceModule } from "./province.module";
import { SectorModule } from "./sector.module";

@Module({
  imports: [ProvinceModule, MunicipalityModule, SectorModule],
  exports: [ProvinceModule, MunicipalityModule, SectorModule],
})
export class AddressModule {}
