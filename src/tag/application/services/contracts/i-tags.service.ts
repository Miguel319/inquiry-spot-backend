import { IBaseSlugUseCase } from "@/common/application/services/contracts";
import { Tag } from "@/tag/infrastructure/persistence/schemas";

export type ITagsService = IBaseSlugUseCase<Tag>;
