import { UpdatePropertyBuyingOptionDto } from "@/real-state/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdatePropertyBuyingOptionCommand {
  constructor(
    public readonly _id: string,
    public readonly updatePropertyBuyingOptionDto: UpdatePropertyBuyingOptionDto,
    public readonly i18n: I18nContext,
  ) {}
}
