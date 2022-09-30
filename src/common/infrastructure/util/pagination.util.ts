import { UnauthorizedException } from "@nestjs/common";
import { I18nContext, I18nService } from "nestjs-i18n";
import { Document } from "mongoose";
import { BaseDto } from "../dtos";
import { PaginationQuery, SharedTranslations } from "@/common/domain/types";
import { Presenter } from "../presenters";

export interface PaginationOptions {
  page: number;
  limit: number;
  sort?: string;
  select?: string;
}

export interface PaginatedQuery<T extends Document | BaseDto | Presenter> {
  docs: T[];
  totalDocs: number;
  offset: number;
  limit: number;
  page: number;
  pagingCunter: number;
  hasPrevPage: number;
  hasNextPage: number;
  prevPage: number | null;
  nextPage: number | null;
}

export const getPaginationOptions = (
  paginationQuery: PaginationQuery,
  i18n: I18nContext | I18nService,
): PaginationOptions => {
  const { page, perPage } = paginationQuery;

  if (perPage > 150)
    throw new UnauthorizedException(
      i18n.t(SharedTranslations.PAGINATION_LIMIT),
    );

  return {
    page: parseInt(String(page), 10) || 1,
    limit: parseInt(String(perPage), 10) || 150,
    sort: "-createdAt",
  };
};
