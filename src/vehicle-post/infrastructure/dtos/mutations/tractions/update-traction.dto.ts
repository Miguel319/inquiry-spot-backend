import { BaseValidationDto } from "@/common/infrastructure/dtos";

export class UpdateTractionDto extends BaseValidationDto {
  readonly name: {
    es: string;
    en: string;
  };
}
