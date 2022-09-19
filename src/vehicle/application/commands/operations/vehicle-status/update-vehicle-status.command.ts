import { UpdateVehicleStatusDto } from "@/vehicle/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdateVehicleStatusCommand {
  constructor(
    public readonly _id: string,
    public readonly updateVehicleStatusDto: UpdateVehicleStatusDto,
    public readonly i18n: I18nContext,
  ) {}
}
