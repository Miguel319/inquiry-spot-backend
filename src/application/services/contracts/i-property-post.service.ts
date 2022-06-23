import { PropertyPost } from "@/domain/entities";
import { PaginationQuery } from "@/domain/types";
import { IBaseService } from "./i-base.service";

export interface IPropertyPostsService extends IBaseService<PropertyPost> {
  findAllFromSeller(
    seller: string,
    paginationQuery: PaginationQuery,
  ): Promise<PropertyPost[]>;
}
