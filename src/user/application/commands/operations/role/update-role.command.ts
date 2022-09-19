import { UpdateRoleDto } from "@/user/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdateRoleCommand {
  constructor(
    public readonly _id: string,
    public readonly updateRoleDto: UpdateRoleDto,
    public readonly i18n: I18nContext,
  ) {}
}
