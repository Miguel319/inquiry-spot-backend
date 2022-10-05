import { IsNotEmpty } from "@/common/infrastructure/decorators";
import {
  SectorTranslations,
  SharedTranslations,
} from "@/common/application/translations";
import { IsDefined, IsMongoId } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { Types } from "mongoose";

export class CreateSectorDto {
  @IsNotEmpty({ message: i18nValidationMessage(SectorTranslations.NAME) })
  @IsDefined({ message: i18nValidationMessage(SectorTranslations.NAME) })
  readonly name: string;

  @IsMongoId({ message: i18nValidationMessage(SharedTranslations.MONGO_ID) })
  @IsNotEmpty({
    message: i18nValidationMessage(SectorTranslations.MUNICIPALITY),
  })
  @IsDefined({
    message: i18nValidationMessage(SectorTranslations.MUNICIPALITY),
  })
  readonly municipality: Types.ObjectId;
}
