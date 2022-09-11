import { CreateBlogDto } from "@/blogs/infrastructure/dtos";

export class CreateBlogCommand {
  constructor(public readonly createBlogDto: CreateBlogDto) {}
}
