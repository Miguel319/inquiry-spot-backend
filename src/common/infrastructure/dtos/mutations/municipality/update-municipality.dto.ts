import { Types } from "mongoose";

export class UpdateMunicipalityDto {
  readonly name: string;
  readonly province: Types.ObjectId;
}
