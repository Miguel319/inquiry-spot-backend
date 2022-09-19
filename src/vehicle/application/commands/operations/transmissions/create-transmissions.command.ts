import { CreateTransmissionDto } from "@/vehicle/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export class CreateTransmissionCommand {
  constructor(
    public readonly createTransmissionDto: CreateTransmissionDto,
    public readonly i18n: I18nContext,
  ) {}
}
