import { CreatePropertyStatusDto } from "@/real-state/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreatePropertyStatusCommand {
  constructor(
    public readonly createPropertyStatusDto: CreatePropertyStatusDto,
    public readonly i18n: I18nContext,
  ) {}
}
