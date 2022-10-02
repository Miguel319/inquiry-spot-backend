import { UpdateColorDto } from "@/common/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdateColorCommand {
  constructor(
    public readonly _id: string,
    public readonly updateColorDto: UpdateColorDto,
    public readonly i18n: I18nContext,
  ) {}
}
