import { UpdateTransmissionDto } from "@/vehicle-post/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class UpdateTransmissionCommand {
  constructor(
    public readonly _id: string,
    public readonly updateTransmissionDto: UpdateTransmissionDto,
    public readonly i18n: I18nContext,
  ) {}
}
