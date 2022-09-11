import { BlogDocument } from "@/blogs/persistence/schemas";
import { IBaseSlugUseCase } from "./i-base.slug.service";

export type IBlogsService = IBaseSlugUseCase<BlogDocument>;
