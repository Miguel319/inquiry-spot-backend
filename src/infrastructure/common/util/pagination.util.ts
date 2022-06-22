import { PaginationQuery } from "@/domain/types";

export interface PaginationOptions {
  page: number;
  limit: number;
  sort?: string;
  select?: string;
}

export const getPaginationOptions = (
  paginationQuery: PaginationQuery,
): PaginationOptions => {
  const { page, perPage } = paginationQuery;

  const options = {
    page: parseInt(String(page), 10) || 1,
    limit: parseInt(String(perPage), 10) || 15,
  };

  return options;
};
