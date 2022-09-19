import { BaseValidationDto } from "@/common/infrastructure/dtos";

export class UpdateVehicleMakeDto extends BaseValidationDto {
  readonly name: string;
}
