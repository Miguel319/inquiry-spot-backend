import { CreateColorDto } from "@/common/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreateColorCommand {
  constructor(
    public readonly createColorDto: CreateColorDto,
    public readonly i18n: I18nContext,
  ) {}
}
