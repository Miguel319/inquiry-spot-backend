import { UpdateVehicleTypeDto } from "@/vehicle-post/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdateVehicleTypeCommand {
  constructor(
    public readonly _id: string,
    public readonly updateVehicleTypeDto: UpdateVehicleTypeDto,
    public readonly i18n: I18nContext,
  ) {}
}
