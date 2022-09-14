import { IBaseSlugUseCase } from "@/application/services/contracts";
import { Tag } from "@/tag/infrastructure/persistence/schemas";

export type ITagsService = IBaseSlugUseCase<Tag>;
