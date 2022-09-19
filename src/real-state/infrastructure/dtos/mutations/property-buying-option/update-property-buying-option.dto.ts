import { BaseValidationDto } from "@/common/infrastructure/dtos";

export class UpdatePropertyBuyingOptionDto extends BaseValidationDto {
  readonly name: {
    es: string;
    en: string;
  };
}
