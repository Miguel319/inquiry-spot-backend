import { NameType } from "@/common/domain/entities";
import { BaseValidationDto } from "@/common/infrastructure/dtos";

export class UpdateVehicleTypeDto extends BaseValidationDto {
  readonly name: NameType;
}
