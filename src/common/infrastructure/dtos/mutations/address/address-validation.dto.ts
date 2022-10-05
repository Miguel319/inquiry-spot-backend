import { IsNotEmpty } from "../../../decorators";
import { IsDefined, IsMongoId } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { SharedTranslations } from "@/common/domain/types";
import { Types } from "mongoose";

export class AddressValidationDto {
  @IsMongoId({ message: SharedTranslations.MONGO_ID })
  @IsNotEmpty({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__ADDRESS_LINE_1),
  })
  @IsDefined({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__ADDRESS_LINE_1),
  })
  readonly addressLine1: Types.ObjectId;

  @IsMongoId({ message: SharedTranslations.MONGO_ID })
  @IsNotEmpty({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__MUNICIPALITY),
  })
  @IsDefined({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__MUNICIPALITY),
  })
  readonly municipality: Types.ObjectId;

  @IsMongoId({ message: SharedTranslations.MONGO_ID })
  @IsNotEmpty({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__PROVINCE),
  })
  @IsDefined({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__PROVINCE),
  })
  readonly province: Types.ObjectId;

  @IsMongoId({ message: SharedTranslations.MONGO_ID })
  @IsNotEmpty({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__SECTOR),
  })
  @IsDefined({
    message: i18nValidationMessage(SharedTranslations.ADDRESS__SECTOR),
  })
  readonly sector: Types.ObjectId;
}
