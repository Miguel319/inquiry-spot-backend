import { Blog } from "@/domain/entities";
import { IBaseSlugUseCase } from "./i-base.slug.service";

export type IBlogsService = IBaseSlugUseCase<Blog>;
