import { TagDocument } from "@/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "../base.repository";

@Injectable()
export class TagsRepository extends BaseRepository<TagDocument> {
  constructor(@InjectModel("Tag") readonly tagModel: Model<TagDocument>) {
    super(tagModel);
  }
}
