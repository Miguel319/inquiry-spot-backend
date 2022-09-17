import { Types } from "mongoose";

export abstract class BaseSchema {
  readonly _id: Types.ObjectId;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
