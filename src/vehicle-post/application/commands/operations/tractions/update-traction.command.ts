import { UpdateTractionDto } from "@/vehicle-post/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdateTractionCommand {
  constructor(
    public readonly _id: string,
    public readonly updateTractionDto: UpdateTractionDto,
    public readonly i18n: I18nContext,
  ) {}
}
