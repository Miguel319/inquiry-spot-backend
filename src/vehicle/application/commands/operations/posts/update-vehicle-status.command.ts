import { UpdateVehiclePostDto } from "@/vehicle/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdateVehiclePostCommand {
  constructor(
    public readonly _id: string,
    public readonly updateVehiclePostDto: UpdateVehiclePostDto,
    public readonly i18n: I18nContext,
  ) {}
}
