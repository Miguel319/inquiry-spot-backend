import { CreatePropertyPostDto } from "@/real-state/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreatePropertyPostCommand {
  constructor(
    public readonly createPropertyPostDto: CreatePropertyPostDto,
    public readonly i18n: I18nContext,
  ) {}
}
