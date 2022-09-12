import { PaginationQuery } from "@/domain/types";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { I18nContext } from "nestjs-i18n";
import { Document } from "mongoose";

export interface IBaseService<T extends Document> {
  findAll(
    paginationQuery?: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<T[] | PaginatedQuery<T>>;

  findById(_id: string, i18n?: I18nContext): Promise<T>;
  create?(entity: T, i18n?: I18nContext): Promise<T>;
  update?(_id: string, entity: T, i18n?: I18nContext): Promise<T | null>;
  delete?(_id: string, i18n?: I18nContext): Promise<boolean>;
}
