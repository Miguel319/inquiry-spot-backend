import { Formatter } from "@/common/infrastructure/util";
import { AggregateRoot } from "@nestjs/cqrs";
import slugify from "slugify";
import { IBlog, IPostedBy } from "../types/i-blog";

export class Blog extends AggregateRoot {
  private blog: IBlog;

  constructor(newBlog: IBlog) {
    super();

    this.blog = newBlog;

    this.setMissingProperties(newBlog);
  }

  public getId(): string {
    return this.blog._id;
  }

  public getTitle(): string {
    return this.blog.title;
  }

  public getSlug(): string {
    return this.blog.slug;
  }

  public getBody(): string {
    return this.blog.body;
  }

  public getExcerpt(): string {
    return this.blog.excerpt;
  }

  public getMtitle(): string {
    return this.blog.mtitle;
  }

  public getMdescription(): string {
    return this.blog.mdescription;
  }

  public getCategory(): string {
    return this.blog.category;
  }

  public getPhoto(): string {
    return this.blog.photo;
  }

  public getPostedBy(): IPostedBy {
    return this.blog.postedBy;
  }

  public getTags(): string[] {
    return this.blog.tags;
  }

  public getCreatedAt() {
    return this.blog.createdAt;
  }

  public getUpdatedAt() {
    return this.blog.updatedAt;
  }

  private setMissingProperties(newBlog: IBlog): void {
    if (!this.blog.slug) {
      this.blog.slug = slugify(newBlog.title).toLowerCase();
      this.blog.excerpt = Formatter.trimText(newBlog.body, 235, " ", "...");
      this.blog.mtitle = `${newBlog.title} | ${process.env["APP_NAME"]}`;
      this.blog.mdescription = Formatter.stripHtmlTags(newBlog.body).substring(
        0,
        160,
      );
    }
  }
}
