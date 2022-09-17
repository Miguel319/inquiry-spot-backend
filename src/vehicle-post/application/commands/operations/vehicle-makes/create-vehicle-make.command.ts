import { CreateVehicleMakeDto } from "@/vehicle-post/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreateVehicleMakeCommand {
  constructor(
    public readonly createVehicleMake: CreateVehicleMakeDto,
    public readonly i18n: I18nContext,
  ) {}
}
