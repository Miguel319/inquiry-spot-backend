import { CreateVehicleTypeDto } from "@/vehicle-post/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreateVehicleTypeCommand {
  constructor(
    public readonly createVehicleTypeDto: CreateVehicleTypeDto,
    public readonly i18n: I18nContext,
  ) {}
}
