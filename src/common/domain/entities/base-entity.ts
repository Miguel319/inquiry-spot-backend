import { IBaseEntity } from "../types";

export abstract class BaseEntity implements IBaseEntity {
  readonly _id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
