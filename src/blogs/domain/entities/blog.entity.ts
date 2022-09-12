import { Formatter } from "@/common/infrastructure/util";
import { AggregateRoot } from "@nestjs/cqrs";
import slugify from "slugify";
import { IBlog, IPostedBy } from "../types";

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

  public updateBlog(blog: IBlog) {
    this.blog = {
      _id: blog._id || this.blog._id,
      body: blog.body || this.blog.body,
      category: blog.category || this.blog.category,
      excerpt: blog.excerpt || this.blog.excerpt,
      mdescription: blog.mdescription || this.blog.mdescription,
      mtitle: blog.mtitle || this.blog.mtitle,
      photo: blog.photo || this.blog.photo,
      postedBy: blog.postedBy || this.blog.postedBy,
      slug: blog.slug || this.blog.slug,
      tags: blog.tags || this.blog.tags,
      createdAt: blog.createdAt || this.blog.createdAt,
      title: blog.title || this.blog.title,
      updatedAt: blog.updatedAt || this.blog.updatedAt,
    };
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
