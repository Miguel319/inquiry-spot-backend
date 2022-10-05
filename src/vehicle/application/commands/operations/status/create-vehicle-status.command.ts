import { CreateVehicleStatusDto } from "@/vehicle/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreateVehicleStatusCommand {
  constructor(
    public readonly createVehicleStatusDto: CreateVehicleStatusDto,
    public readonly i18n: I18nContext,
  ) {}
}
