import { BaseValidationDto } from "@/common/infrastructure/dtos";

export class UpdateVehicleTypeDto extends BaseValidationDto {
  readonly name: {
    es: string;
    en: string;
  };
}
