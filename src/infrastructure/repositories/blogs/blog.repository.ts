import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BlogDocument } from "@/domain/entities/blog.entity";
import { BaseRepository } from "../base.repository";

@Injectable()
export class BlogRepository extends BaseRepository<BlogDocument> {
  constructor(@InjectModel("Blog") readonly blogModel: Model<BlogDocument>) {
    super(blogModel);
  }
}
