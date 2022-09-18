import { BaseValidationDto } from "@/common/infrastructure/dtos";

export class UpdateFuelDto extends BaseValidationDto {
  readonly name: {
    en: string;
    es: string;
  };
}
