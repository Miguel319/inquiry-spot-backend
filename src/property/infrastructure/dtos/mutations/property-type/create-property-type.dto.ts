import { IsNotEmpty } from "@/common/infrastructure/decorators";
import {
  BaseValidationDto,
  NameTypeValidationDto,
} from "@/common/infrastructure/dtos";
import { PropertyTypeTranslations } from "@/property/application/translations";
import { Type } from "class-transformer";
import { IsDefined, ValidateNested } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreatePropertyTypeDto extends BaseValidationDto {
  @IsNotEmpty({ message: i18nValidationMessage(PropertyTypeTranslations.NAME) })
  @IsDefined({ message: i18nValidationMessage(PropertyTypeTranslations.NAME) })
  @ValidateNested()
  @Type(() => NameTypeValidationDto)
  readonly name: NameTypeValidationDto;
}
