import { UpdatePropertyTypeDto } from "@/property/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdatePropertyTypeCommand {
  constructor(
    public readonly _id: string,
    public readonly updatePropertyTypeDto: UpdatePropertyTypeDto,
    public readonly i18n: I18nContext,
  ) {}
}
