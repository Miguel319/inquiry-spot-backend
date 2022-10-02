import { CreateProvinceDto } from "@/common/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreateProvinceCommand {
  constructor(
    public readonly createProvinceDto: CreateProvinceDto,
    public readonly i18n: I18nContext,
  ) {}
}
