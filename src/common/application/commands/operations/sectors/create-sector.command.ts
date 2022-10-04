import { CreateSectorDto } from "@/common/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreateSectorCommand {
  constructor(
    public readonly createSectorDto: CreateSectorDto,
    public readonly i18n: I18nContext,
  ) {}
}
