import { Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";

export abstract class BaseSchema {
  @Prop()
  readonly _id: Types.ObjectId;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
