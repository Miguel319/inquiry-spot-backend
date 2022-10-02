import { IsNotEmpty } from "@/common/infrastructure/decorators";
import { BaseValidationDto } from "@/common/infrastructure/dtos";
import { MunicipalityTranslations } from "@/common/application/translations";
import { IsDefined } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateMunicipalityDto extends BaseValidationDto {
  @IsNotEmpty({ message: i18nValidationMessage(MunicipalityTranslations.NAME) })
  @IsDefined({ message: i18nValidationMessage(MunicipalityTranslations.NAME) })
  readonly name: string;
}
