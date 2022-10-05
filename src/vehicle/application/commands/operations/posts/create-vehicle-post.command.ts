import { CreateVehiclePostDto } from "@/vehicle/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreateVehiclePostCommand {
  constructor(
    public readonly createVehiclePostDto: CreateVehiclePostDto,
    public readonly i18n: I18nContext,
  ) {}
}
