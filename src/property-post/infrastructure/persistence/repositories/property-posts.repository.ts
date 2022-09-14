import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { PropertyPostDocument } from "../schemas";
import { BaseRepository } from "@/common/infrastructure/persistence/repositories";

@Injectable()
export class PropertyPostsRepository extends BaseRepository<PropertyPostDocument> {
  constructor(
    @InjectModel("PropertyPost")
    readonly propertyPostModel: Model<PropertyPostDocument>,
  ) {
    super(propertyPostModel);
  }
}
