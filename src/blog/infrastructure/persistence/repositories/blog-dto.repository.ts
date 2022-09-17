import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { BlogDto } from "../../dtos";
import { BlogDocument, BlogSchema } from "../schemas";

@Injectable()
export class BlogDtoRepository {
  constructor(
    @InjectModel(BlogSchema.name) private readonly blogModel: Model<BlogSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<BlogSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<BlogDto>> {
    const query = {} as Record<string, unknown>;

    Object.keys(entityFilterQuery).forEach((key) => {
      if (entityFilterQuery[key]) {
        query[key] = entityFilterQuery[key];
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.blogModel as any).paginate({ ...query }, { options });
  }

  private sanitizeBlog(blog: BlogDocument): BlogDto {
    return {
      _id: blog._id,
      body: blog.body,
      category: blog.category,
      createdAt: blog.createdAt,
      excerpt: blog.excerpt,
      mdescription: blog.mdescription,
      mtitle: blog.mtitle,
      photo: blog.photo,
      postedBy: blog.postedBy,
      slug: blog.slug,
      tags: blog.tags,
      title: blog.title,
      updatedAt: blog.updatedAt,
    };
  }

  async getBySlug(slug: string): Promise<BlogDto | null> {
    const blog = await this.blogModel.findOne({ slug }, {}, { lean: true });

    if (!blog) return null;

    return this.sanitizeBlog(blog);
  }

  async getById(_id: string): Promise<BlogDto | null> {
    const blog = await this.blogModel.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!blog) return null;

    return this.sanitizeBlog(blog);
  }

  async getAll() {
    return (await this.blogModel.find({}, {}, { lean: true })).map((v) => v);
  }
}
