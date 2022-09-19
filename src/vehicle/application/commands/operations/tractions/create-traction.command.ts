import { CreateTractionDto } from "@/vehicle/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreateTractionCommand {
  constructor(
    public readonly createTractionDto: CreateTractionDto,
    public readonly i18n: I18nContext,
  ) {}
}
