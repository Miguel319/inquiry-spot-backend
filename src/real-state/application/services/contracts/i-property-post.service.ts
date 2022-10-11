import { PropertyPost } from "@/real-state/domain/entities";
import { UpdatePropertyPostDto } from "@/real-state/infrastructure/dtos";
import { I18nContext } from "nestjs-i18n";

export interface IPropertyPostsService {
  findById(_id: string, i18n: I18nContext): Promise<PropertyPost>;
  mapToEntities(
    propertyPost: PropertyPost,
    i18n: I18nContext,
    operation: "create" | "edit",
    dto?: UpdatePropertyPostDto,
  ): Promise<void>;
}
