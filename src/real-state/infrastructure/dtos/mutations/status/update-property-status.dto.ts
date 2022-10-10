import { BaseValidationDto } from "@/common/infrastructure/dtos";

export class UpdatePropertyStatusDto extends BaseValidationDto {
  readonly name: {
    es: string;
    en: string;
  };
}
