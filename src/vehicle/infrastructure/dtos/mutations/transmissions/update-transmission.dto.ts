import { BaseValidationDto } from "@/common/infrastructure/dtos";

export class UpdateTransmissionDto extends BaseValidationDto {
  readonly name: {
    es: string;
    en: string;
  };
}
