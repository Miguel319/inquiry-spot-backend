import { IsNotEmpty } from "@/common/infrastructure/decorators";
import { BaseValidationDto } from "@/common/infrastructure/dtos";
import {
  MunicipalityTranslations,
  SharedTranslations,
} from "@/common/application/translations";
import { IsDefined, IsMongoId } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { Types } from "mongoose";

export class CreateMunicipalityDto extends BaseValidationDto {
  @IsNotEmpty({ message: i18nValidationMessage(MunicipalityTranslations.NAME) })
  @IsDefined({ message: i18nValidationMessage(MunicipalityTranslations.NAME) })
  readonly name: string;

  @IsMongoId({ message: i18nValidationMessage(SharedTranslations.MONGO_ID) })
  @IsNotEmpty({
    message: i18nValidationMessage(MunicipalityTranslations.PROVINCE),
  })
  @IsDefined({
    message: i18nValidationMessage(MunicipalityTranslations.PROVINCE),
  })
  readonly province: Types.ObjectId;
}
