import { BlogDocument } from "@/blogs/infrastructure/persistence/schemas";
import { IBaseSlugUseCase } from "./i-base.slug.service";

export type IBlogsService = IBaseSlugUseCase<BlogDocument>;
