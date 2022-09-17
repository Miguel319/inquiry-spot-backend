import { BlogCreatedEvent } from "@/blog/application/events";
import { Blog } from "@/blog/domain/entities";
import { EntityFactory } from "@/common/infrastructure/persistence/factories";
import { UserDocument } from "@/user/infrastructure/persistence/schemas";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { BlogEntityRepository } from "../persistence/repositories";
import { BlogDocument } from "../persistence/schemas";

@Injectable()
export class BlogFactory implements EntityFactory<Blog> {
  constructor(private readonly _blogEntityRepository: BlogEntityRepository) {}

  private async linkWithUser(user: UserDocument, blog: BlogDocument) {
    blog.postedBy = {
      _id: user._id,
      name: user.name,
    };

    if (!user.blogPosts) user.blogPosts = [];

    user.blogPosts.push(blog._id);

    await blog.save();
    await user.save();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<Blog> {
    const blog = new Blog({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    const newBlog = await this._blogEntityRepository.create(blog);

    const currentUser = args[1] as UserDocument;

    await this.linkWithUser(currentUser, newBlog);

    blog.apply(new BlogCreatedEvent(blog.getId()));

    return blog;
  }
}
