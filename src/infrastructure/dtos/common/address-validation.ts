import { IsNotEmpty } from "../../../common/infrastructure/decorators";
import { IsDefined } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { SharedTranslations } from ".././../../domain/types";

export class AddresValidation {
  @IsNotEmpty({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__ADDRESS_LINE_1),
  })
  @IsDefined({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__ADDRESS_LINE_1),
  })
  readonly addressLine1: string;

  @IsNotEmpty({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__CITY),
  })
  @IsDefined({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__CITY),
  })
  readonly city: string;

  @IsNotEmpty({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__PROVINCE),
  })
  @IsDefined({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__PROVINCE),
  })
  readonly province: string;
}
