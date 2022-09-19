import { BaseValidationDto } from "@/common/infrastructure/dtos";

export class UpdatePropertyTypeDto extends BaseValidationDto {
  readonly name: {
    es: string;
    en: string;
  };
}
