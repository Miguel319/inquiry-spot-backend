import { Prop } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

export abstract class IdEntitySchema {
  @Prop()
  readonly _id: ObjectId;
}
