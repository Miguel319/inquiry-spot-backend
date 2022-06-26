import { PaginationQuery, SharedTranslations } from "../../../domain/types";
import { UnauthorizedException } from "@nestjs/common";
import { I18nContext, I18nService } from "nestjs-i18n";

export interface PaginationOptions {
  page: number;
  limit: number;
  sort?: string;
  select?: string;
}

export const getPaginationOptions = (
  paginationQuery: PaginationQuery,
  i18n: I18nContext | I18nService,
): PaginationOptions => {
  const { page, perPage } = paginationQuery;

  if (perPage > 50)
    throw new UnauthorizedException(
      i18n.t(SharedTranslations.PAGINATION_LIMIT),
    );

  const options = {
    page: parseInt(String(page), 10) || 1,
    limit: parseInt(String(perPage), 10) || 15,
  };

  return options;
};
