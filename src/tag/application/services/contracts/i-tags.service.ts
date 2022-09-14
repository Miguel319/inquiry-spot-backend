import { IBaseSlugUseCase } from "@/application/services/contracts";
import { Tag } from "@/domain/entities";

export type ITagsService = IBaseSlugUseCase<Tag>;
