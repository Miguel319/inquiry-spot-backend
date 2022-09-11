import { BlogCreatedEvent } from "@/blogs/application/events";
import { EntityFactory } from "@/common/persistence/factories";
import { Blog } from "@/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { BlogEntityRepository } from "../repositories";

@Injectable()
export class BlogFactory implements EntityFactory<Blog> {
  constructor(private readonly blogEntityRepository: BlogEntityRepository) {}

  async create(...args: any[]): Promise<Blog> {
    const blog = new Blog({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this.blogEntityRepository.create(blog);

    blog.apply(new BlogCreatedEvent(blog.getId()));

    return blog;
  }
}
