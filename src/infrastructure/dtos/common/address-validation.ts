import { IsNotEmpty } from "../../../infrastructure/common/decorators";
import { IsDefined } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class AddresValidation {
  @IsNotEmpty({
    message: i18nValidationMessage(
      "validations.vehiclePost.address.addressLine1",
    ),
  })
  @IsDefined({
    message: i18nValidationMessage(
      "validations.vehiclePost.address.addessLine1",
    ),
  })
  readonly addressLine1: string;

  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.address.city"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.address.city"),
  })
  readonly city: string;

  @IsNotEmpty({
    message: i18nValidationMessage("validations.vehiclePost.address.province"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.vehiclePost.address.province"),
  })
  readonly province: string;
}
