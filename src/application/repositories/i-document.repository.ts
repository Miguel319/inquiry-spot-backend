import { PaginationOptions } from "@/common/infrastructure/util/pagination.util";
import {
  AnyKeys,
  AnyObject,
  Document,
  FilterQuery,
  HydratedDocument,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

export interface IDocumentRepository<T> {
  findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    select?: QueryOptions | null,
  ): Promise<T | null>;

  aggregate(
    pipeline?: unknown[] | undefined,
    options?: Record<string, unknown> | undefined,
  ): Promise<unknown>;

  find(
    entityFilterQuery: FilterQuery<T>,
    select?: string,
  ): Promise<Document<T, Record<string, unknown>, Record<string, unknown>>[]>;

  paginate(
    entityFilterQuery: FilterQuery<T>,
    options?: PaginationOptions,
  ): Promise<Document<T, Record<string, unknown>, Record<string, unknown>>[]>;

  create(createEntityData: (AnyKeys<T> & AnyObject) | undefined): Promise<T>;

  findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<HydratedDocument<
    T,
    Record<string, unknown>,
    Record<string, unknown>
  > | null>;

  deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean>;

  deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean>;
}
