import { PaginatedQuery } from "../../common/infrastructure/util";
import { Document } from "mongoose";

export class PaginatedQueryPresenter<T extends Document> {
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

  constructor(query: PaginatedQuery<T>) {
    this.docs = query.docs;
    this.totalDocs = query.totalDocs;
    this.offset = query.offset;
    this.limit = query.limit;
    this.page = query.page;
    this.pagingCunter = query.pagingCunter;
    this.hasPrevPage = query.hasPrevPage;
    this.hasNextPage = query.hasNextPage;
    this.prevPage = query.prevPage;
    this.nextPage = query.nextPage;
  }

  public static create<T extends Document>(query: PaginatedQuery<T>) {
    return new PaginatedQueryPresenter(query);
  }
}
