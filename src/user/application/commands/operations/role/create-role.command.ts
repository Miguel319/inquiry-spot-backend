import { CreateRoleDto } from "@/user/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreateRoleCommand {
  constructor(
    public readonly createRoleDto: CreateRoleDto,
    public readonly i18n: I18nContext,
  ) {}
}
