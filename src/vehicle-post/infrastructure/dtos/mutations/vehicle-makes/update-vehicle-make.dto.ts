import {
  BaseValidationDto,
  NameTypeValidationDto,
} from "@/common/infrastructure/dtos";

export class UpdateVehicleMakeDto extends BaseValidationDto {
  readonly name: NameTypeValidationDto;
}
