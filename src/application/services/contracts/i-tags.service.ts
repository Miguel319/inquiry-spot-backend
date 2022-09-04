import { Tag } from "@/domain/entities/tag.entity";
import { IBaseSlugUseCase } from "./i-base.slug.service";

export type ITagsService = IBaseSlugUseCase<Tag>;
