import { UpdateMunicipalityDto } from "@/common/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdateMunicipalityCommand {
  constructor(
    public readonly _id: string,
    public readonly updateMunicipalityDto: UpdateMunicipalityDto,
    public readonly i18n: I18nContext,
  ) {}
}
