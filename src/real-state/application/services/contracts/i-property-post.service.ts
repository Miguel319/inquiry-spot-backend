import { IBaseService } from "@/common/application/services/contracts";
import { PaginationQuery } from "@/common/domain/types/common";
import {
  PropertyPost,
  PropertyPostDocument,
} from "@/real-state/infrastructure/persistence/schemas";
import { I18nContext } from "nestjs-i18n";

export interface IPropertyPostsService
  extends IBaseService<PropertyPostDocument> {
  findAllFromSeller(
    seller: string,
    paginationQuery: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<PropertyPost[]>;
}
