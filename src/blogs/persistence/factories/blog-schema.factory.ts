import { EntitySchemaFactory } from "@/common/persistence/factories";
import { Blog } from "@/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { BlogSchema } from "../schemas";

@Injectable()
export class BlogSchemaFactory
  implements EntitySchemaFactory<BlogSchema, Blog>
{
  create(blog: Blog): BlogSchema {
    console.log("blog", blog);

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

    return new Blog(
      blogSchema._id.toHexString(),
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
    );

    // return new Blog({
    //   ...blogSchema,
    //   _id: blogSchema._id,
    // } as unknown as IBlog);
  }
}
