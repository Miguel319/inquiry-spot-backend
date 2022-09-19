import { CreateFuelDto } from "@/vehicle/infrastructure/dtos/mutations/fuels";
import { I18nContext } from "nestjs-i18n";

export class CreateFuelCommand {
  constructor(
    public readonly createFuelDto: CreateFuelDto,
    public readonly i18n: I18nContext,
  ) {}
}
