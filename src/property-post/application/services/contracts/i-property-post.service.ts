import { IBaseService } from "@/application/services/contracts";
import { PaginationQuery } from "@/domain/types";
import {
  PropertyPost,
  PropertyPostDocument,
} from "@/property-post/infrastructure/persistence/schemas";
import { I18nContext } from "nestjs-i18n";

export interface IPropertyPostsService
  extends IBaseService<PropertyPostDocument> {
  findAllFromSeller(
    seller: string,
    paginationQuery: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<PropertyPost[]>;
}
