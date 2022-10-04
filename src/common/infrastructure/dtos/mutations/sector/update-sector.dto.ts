import { SharedTranslations } from "@/common/application/translations";
import { IsMongoId } from "class-validator";
import { Types } from "mongoose";
import { i18nValidationMessage } from "nestjs-i18n";

export class UpdateSectorDto {
  readonly name: string;

  @IsMongoId({ message: i18nValidationMessage(SharedTranslations.MONGO_ID) })
  readonly municipality: Types.ObjectId;
}
