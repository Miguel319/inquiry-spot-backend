import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "@/infrastructure/repositories";
import { PropertyPostDocument } from "../schemas";

@Injectable()
export class PropertyPostsRepository extends BaseRepository<PropertyPostDocument> {
  constructor(
    @InjectModel("PropertyPost")
    readonly propertyPostModel: Model<PropertyPostDocument>,
  ) {
    super(propertyPostModel);
  }
}
