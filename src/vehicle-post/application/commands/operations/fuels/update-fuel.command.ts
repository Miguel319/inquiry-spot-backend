import { UpdateFuelDto } from "@/vehicle-post/infrastructure/dtos/mutations/fuels";
import { I18nContext } from "nestjs-i18n";

export class UpdateFuelCommand {
  constructor(
    public readonly _id: string,
    public readonly updateFuelDto: UpdateFuelDto,
    public readonly i18n: I18nContext,
  ) {}
}
