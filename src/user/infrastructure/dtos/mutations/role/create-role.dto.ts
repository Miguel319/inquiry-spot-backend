import { IsNotEmpty } from "@/common/infrastructure/decorators";
import {
  BaseValidationDto,
  NameTypeValidationDto,
} from "@/common/infrastructure/dtos";
import { RoleTranslations } from "@/user/application/translations";
import { Type } from "class-transformer";

import { IsDefined, ValidateNested } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateRoleDto extends BaseValidationDto {
  @IsNotEmpty({ message: i18nValidationMessage(RoleTranslations.NAME) })
  @IsDefined({ message: i18nValidationMessage(RoleTranslations.NAME) })
  @ValidateNested()
  @Type(() => NameTypeValidationDto)
  readonly name: NameTypeValidationDto;
}
