import { NameType } from "@/common/domain/entities";
import { BaseValidationDto } from "@/common/infrastructure/dtos";

export class UpdateVehicleStatusDto extends BaseValidationDto {
  readonly name: NameType;
}
