import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { PropertyPostDocument } from "@/domain/entities";
import { BaseRepository } from "@/infrastructure/repositories";

@Injectable()
export class PropertyPostsRepository extends BaseRepository<PropertyPostDocument> {
  constructor(
    @InjectModel("PropertyPost")
    readonly propertyPostModel: Model<PropertyPostDocument>,
  ) {
    super(propertyPostModel);
  }
}
