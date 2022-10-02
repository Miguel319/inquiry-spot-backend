import { Types } from "mongoose";

export abstract class BaseDto {
  readonly _id: Types.ObjectId;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
