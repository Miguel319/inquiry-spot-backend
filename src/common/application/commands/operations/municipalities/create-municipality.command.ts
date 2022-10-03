import { CreateMunicipalityDto } from "@/common/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreateMunicipalityCommand {
  constructor(
    public readonly createMunicipalityDto: CreateMunicipalityDto,
    public readonly i18n: I18nContext,
  ) {}
}
