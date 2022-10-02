import { UpdateProvinceDto } from "@/common/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdateProvinceCommand {
  constructor(
    public readonly _id: string,
    public readonly updateProvinceDto: UpdateProvinceDto,
    public readonly i18n: I18nContext,
  ) {}
}
