import { AggregateRoot } from "@nestjs/cqrs";

export class Blog extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly title: string,
    private readonly slug: string,
    private readonly body: string,
    private readonly excerpt: string,
    private readonly mtitle: string,
    private readonly mdescription: string,
    private readonly category: string,
    private readonly photo: string,
    private readonly postedBy: string,
    private readonly tags: string[],
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {
    super();
  }

  public getId(): string {
    return this._id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getSlug(): string {
    return this.slug;
  }

  public getBody(): string {
    return this.body;
  }

  public getExcerpt(): string {
    return this.excerpt;
  }

  public getMtitle(): string {
    return this.mtitle;
  }

  public getMdescription(): string {
    return this.mdescription;
  }

  public getCategory(): string {
    return this.category;
  }

  public getPhoto(): string {
    return this.photo;
  }

  public getPostedBy(): string {
    return this.postedBy;
  }

  public getTags(): string[] {
    return this.tags;
  }

  public getCreatedAt() {
    return this.createdAt;
  }

  public getUpdatedAt() {
    return this.updatedAt;
  }
}
