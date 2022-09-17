import { Blog } from "@/blog/domain/entities";
import { EntitySchemaFactory } from "@/common/infrastructure/persistence/factories";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { BlogSchema } from "../persistence/schemas";

@Injectable()
export class BlogSchemaFactory
  implements EntitySchemaFactory<BlogSchema, Blog>
{
  create(blog: Blog): BlogSchema {
    return {
      _id: new Types.ObjectId(blog.getId()),
      body: blog.getBody(),
      category: blog.getCategory(),
      createdAt: blog.getCreatedAt(),
      excerpt: blog.getExcerpt(),
      mdescription: blog.getMdescription(),
      mtitle: blog.getMtitle(),
      photo: blog.getPhoto(),
      postedBy: blog.getPostedBy(),
      slug: blog.getSlug(),
      tags: blog.getTags(),
      title: blog.getTitle(),
      updatedAt: blog.getUpdatedAt(),
    };
  }
  createFromSchema(blogSchema: BlogSchema | null): Blog | null {
    if (!blogSchema) return null;

    return new Blog({ ...blogSchema, _id: blogSchema._id.toHexString() });
  }
}
