import { IsNotEmpty } from "@/common/infrastructure/decorators";
import {
  BaseValidationDto,
  NameTypeValidationDto,
} from "@/common/infrastructure/dtos";
import { PropertyBuyingOptionTranslations } from "@/real-state/application/translations";
import { Type } from "class-transformer";
import { IsDefined, ValidateNested } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreatePropertyBuyingOptionDto extends BaseValidationDto {
  @IsNotEmpty({
    message: i18nValidationMessage(PropertyBuyingOptionTranslations.NAME),
  })
  @IsDefined({
    message: i18nValidationMessage(PropertyBuyingOptionTranslations.NAME),
  })
  @ValidateNested()
  @Type(() => NameTypeValidationDto)
  readonly name: NameTypeValidationDto;
}
