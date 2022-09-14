import { BaseRepository } from "@/infrastructure/repositories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TagDocument } from "../schemas";

@Injectable()
export class TagsRepository extends BaseRepository<TagDocument> {
  constructor(@InjectModel("Tag") readonly tagModel: Model<TagDocument>) {
    super(tagModel);
  }
}
