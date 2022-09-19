import { CreatePropertyBuyingOptionDto } from "@/real-state/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreatePropertyBuyingOptionCommand {
  constructor(
    public readonly createPropertyBuyingOptionDto: CreatePropertyBuyingOptionDto,
    public readonly i18n: I18nContext,
  ) {}
}
