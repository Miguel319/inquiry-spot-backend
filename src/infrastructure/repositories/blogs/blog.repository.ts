import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "../base.repository";
import { BlogDocument } from "@/blogs/infrastructure/persistence/schemas";

@Injectable()
export class BlogRepository extends BaseRepository<BlogDocument> {
  constructor(@InjectModel("Blog") readonly blogModel: Model<BlogDocument>) {
    super(blogModel);
  }
}
