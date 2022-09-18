import { UpdateVehicleMakeDto } from "@/vehicle-post/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdateVehicleMakeCommand {
  constructor(
    public readonly _id: string,
    public readonly updateVehicleMakeDto: UpdateVehicleMakeDto,
    public readonly i18n: I18nContext,
  ) {}
}
