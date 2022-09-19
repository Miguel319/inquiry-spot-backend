import { UpdatePropertyStatusDto } from "@/real-state/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdatePropertyStatusCommand {
  constructor(
    public readonly _id: string,
    public readonly updatePropertyStatusDto: UpdatePropertyStatusDto,
    public readonly i18n: I18nContext,
  ) {}
}
