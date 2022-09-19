import { BaseValidationDto } from "@/common/infrastructure/dtos";

export class UpdateVehicleStatusDto extends BaseValidationDto {
  readonly name: {
    es: string;
    en: string;
  };
}
