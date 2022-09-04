import { Blog, BlogDocument, User } from "@/domain/entities";
import { Formatter } from "@/infrastructure/common/util";
import { BlogRepository } from "@/infrastructure/repositories";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import slugify from "slugify";
import { IUsersService, IBlogsService } from "../../contracts";

@Injectable()
export class BlogsService implements IBlogsService {
  constructor(
    private readonly blogRepository: BlogRepository,
    @Inject("IUsersService") private readonly userService: IUsersService,
  ) {}

  findById(_id: string): Promise<Blog | null> {
    return this.blogRepository.findOne({ _id });
  }

  public findAll(): Promise<Blog[]> {
    return this.blogRepository.find({});
  }

  public async findBySlug(slug: string): Promise<Blog> {
    const blog: Blog | null = await this.blogRepository.findOne({ slug });

    if (!blog) throw new NotFoundException("Blog not found.");

    return blog;
  }

  public async create(entity: Blog): Promise<Blog | null> {
    await this.userService.findCurrent();

    return this.handleBlogCreation(entity);
  }

  public update(slug: string, entity: Blog): Promise<Blog | null> {
    return this.blogRepository.findOneAndUpdate({ slug }, entity);
  }

  public async delete(slug: string): Promise<boolean> {
    return this.blogRepository.deleteOne({ slug });
  }

  private pushToCategoriesAndTags(blog: Blog, fields: any) {
    if (!blog.tags) blog.tags = [];

    blog.tags.push(fields.tags.split(","));
  }

  private async handleBlogCreation(fields: Blog): Promise<Blog> {
    fields.slug = slugify(fields.title).toLowerCase();
    fields.excerpt = Formatter.trimText(fields.body, 235, " ", "...");

    const blog: BlogDocument = await this.blogRepository.create(fields);

    blog.mtitle = `${blog.title} | ${process.env["APP_NAME"]}`;

    blog.mdescription = Formatter.stripHtmlTags(blog.body).substring(0, 160);

    const user = (await this.userService.findCurrent()) as User;

    blog.postedBy = user._id;

    this.pushToCategoriesAndTags(blog, fields);

    await blog.save();

    return blog;
  }
}
