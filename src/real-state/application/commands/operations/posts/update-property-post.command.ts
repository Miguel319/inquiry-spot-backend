import { UpdatePropertyPostDto } from "@/real-state/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdatePropertyPostCommand {
  constructor(
    public readonly _id: string,
    public readonly updatePropertyPostDto: UpdatePropertyPostDto,
    public readonly i18n: I18nContext,
  ) {}
}
