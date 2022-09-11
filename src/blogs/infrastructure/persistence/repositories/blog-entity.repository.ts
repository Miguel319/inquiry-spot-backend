import { BaseEntityRepository } from "@/common/persistence/repositories";
import { Blog } from "@/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BlogSchemaFactory } from "../factories";
import { BlogSchema } from "../schemas";

@Injectable()
export class BlogEntityRepository extends BaseEntityRepository<
  BlogSchema,
  Blog
> {
  constructor(
    @InjectModel(BlogSchema.name) blog: Model<BlogSchema>,
    blogSchemaFactory: BlogSchemaFactory,
  ) {
    super(blog, blogSchemaFactory);
  }
}
