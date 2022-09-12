import { BaseDto } from "@/common/infrastructure/dtos";
import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util/pagination.util";
import { FilterQuery, QueryOptions } from "mongoose";

export interface IDtoRepository<T extends BaseDto> {
  findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    select?: QueryOptions | null,
  ): Promise<T | null>;

  aggregate(
    pipeline?: unknown[] | undefined,
    options?: Record<string, unknown> | undefined,
  ): Promise<unknown>;

  find(entityFilterQuery: FilterQuery<T>, select?: string): Promise<T[]>;

  paginate(
    entityFilterQuery: FilterQuery<T>,
    options?: PaginationOptions,
  ): Promise<PaginatedQuery<T>>;
}
