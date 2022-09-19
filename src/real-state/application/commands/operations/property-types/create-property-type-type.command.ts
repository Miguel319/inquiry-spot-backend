import { CreatePropertyTypeDto } from "@/real-state/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreatePropertyTypeCommand {
  constructor(
    public readonly createPropertyTypeDto: CreatePropertyTypeDto,
    public readonly i18n: I18nContext,
  ) {}
}
