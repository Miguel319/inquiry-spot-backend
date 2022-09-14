import { PaginationQuery } from "@/common/domain/types/common";

export interface IBlogValuesQuery extends PaginationQuery {
  readonly title: string;
  readonly slug: string;
  readonly category: string;
  readonly tags: string[];
}
