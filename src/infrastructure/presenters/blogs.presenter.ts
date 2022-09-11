import { IPostedBy } from "@/blogs/domain/types/i-blog";
import { BlogDocument } from "@/blogs/persistence/schemas";
import { ApiProperty } from "@nestjs/swagger";
import { Presenter } from "./base-presenter";

export class BlogsPresenter extends Presenter {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  slug: string;

  @ApiProperty({ required: true })
  body: string;

  @ApiProperty({ required: true })
  excerpt: string;

  @ApiProperty({ required: true })
  photo: string;

  @ApiProperty({ required: true })
  category: string;

  @ApiProperty({ required: true })
  tags: Array<string>;

  @ApiProperty({ required: true })
  postedBy: IPostedBy;

  private constructor(blog: BlogDocument) {
    super(blog);

    this.title = blog._id;
    this.slug = blog.slug;
    this.body = blog.body;
    this.excerpt = blog.excerpt;
    this.photo = blog.photo;
    this.category = blog.category;
    this.tags = blog.tags;
    this.postedBy = blog.postedBy;
  }

  public static create(blog: BlogDocument): BlogsPresenter {
    return new BlogsPresenter(blog);
  }
}
