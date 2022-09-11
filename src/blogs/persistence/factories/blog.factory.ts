import { BlogCreatedEvent } from "@/blogs/application/events";
import { EntityFactory } from "@/common/persistence/factories";
import { Blog } from "@/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { BlogEntityRepository } from "../repositories";

@Injectable()
export class BlogFactory implements EntityFactory<Blog> {
  constructor(private readonly blogEntityRepository: BlogEntityRepository) {}

  async create(...args: any): Promise<Blog> {
    const blogSchema = args[0];

    const blog = new Blog(
      // blogSchema._id,
      new Types.ObjectId().toHexString(),
      blogSchema.title,
      blogSchema.slug,
      blogSchema.body,
      blogSchema.excerpt,
      blogSchema.mtitle,
      blogSchema.mdescription,
      blogSchema.category,
      blogSchema.photo,
      blogSchema.postedBy,
      blogSchema.tags,
      blogSchema.createdAt,
      blogSchema.updatedAt,

      // ...args[0],
      // _id: new Types.ObjectId().toHexString(),
    );

    console.log("blog", blog.getBody());

    await this.blogEntityRepository.create(blog);

    blog.apply(new BlogCreatedEvent((blog as any)._id));

    return blog;
  }
}
