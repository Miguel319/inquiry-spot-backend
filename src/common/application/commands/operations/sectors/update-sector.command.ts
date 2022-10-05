import { UpdateSectorDto } from "@/common/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdateSectorCommand {
  constructor(
    public readonly _id: string,
    public readonly updateSectorDto: UpdateSectorDto,
    public readonly i18n: I18nContext,
  ) {}
}
