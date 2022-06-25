import { IsNotEmpty } from "../../../infrastructure/common/decorators";
import { IsDefined } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class AddresValidation {
  @IsNotEmpty({
    message: i18nValidationMessage("validations.shared.address.addressLine1"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.shared.address.addessLine1"),
  })
  readonly addressLine1: string;

  @IsNotEmpty({
    message: i18nValidationMessage("validations.shared.address.city"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.shared.address.city"),
  })
  readonly city: string;

  @IsNotEmpty({
    message: i18nValidationMessage("validations.shared.address.province"),
  })
  @IsDefined({
    message: i18nValidationMessage("validations.shared.address.province"),
  })
  readonly province: string;
}
