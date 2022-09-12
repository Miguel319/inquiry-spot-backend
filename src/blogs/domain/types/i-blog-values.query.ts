import { PaginationQuery } from "@/domain/types";

export interface IBlogValuesQuery extends PaginationQuery {
  readonly title: string;
  readonly slug: string;
  readonly category: string;
  readonly tags: string[];
}
