import { IsNotEmpty } from "@/common/infrastructure/decorators";
import {
  MunicipalityTranslations,
  SharedTranslations,
} from "@/common/application/translations";
import { IsDefined, IsMongoId } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { Types } from "mongoose";

export class CreateMunicipalityDto {
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
