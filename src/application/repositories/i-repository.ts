import {
  AnyKeys,
  AnyObject,
  Document,
  FilterQuery,
  HydratedDocument,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

export interface IRepository<T> {
  findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    select?: QueryOptions | null,
  ): Promise<T | null>;

  aggregate(
    pipeline?: any[] | undefined,
    options?: Record<string, unknown> | undefined,
  ): Promise<any>;

  find(
    entityFilterQuery: FilterQuery<T>,
    select?: string,
  ): Promise<Document<T, {}, {}>[]>;

  create(createEntityData: (AnyKeys<T> & AnyObject) | undefined): Promise<T>;

  findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<HydratedDocument<T, {}, {}> | null>;

  deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean>;

  deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean>;
}
