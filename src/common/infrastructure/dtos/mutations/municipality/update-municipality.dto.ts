import { BaseValidationDto } from "@/common/infrastructure/dtos";

export class UpdateMunicipalityDto extends BaseValidationDto {
  readonly name: string;
}
