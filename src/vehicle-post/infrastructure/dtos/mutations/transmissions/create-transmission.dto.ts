import { IsNotEmpty } from "@/common/infrastructure/decorators";
import {
  BaseValidationDto,
  NameTypeValidationDto,
} from "@/common/infrastructure/dtos";
import { TransmissionTranslations } from "@/vehicle-post/application/translations";
import { Type } from "class-transformer";
import { IsDefined, ValidateNested } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateTransmissionDto extends BaseValidationDto {
  @IsNotEmpty({ message: i18nValidationMessage(TransmissionTranslations.NAME) })
  @IsDefined({ message: i18nValidationMessage(TransmissionTranslations.NAME) })
  @ValidateNested()
  @Type(() => NameTypeValidationDto)
  readonly name: NameTypeValidationDto;
}
