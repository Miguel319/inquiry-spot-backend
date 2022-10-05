import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { VehiclePostDocument, VehiclePostSchema } from "../../schemas";
import { BaseRepository } from "@/common/infrastructure/persistence/repositories";

@Injectable()
export class VehiclePostsRepository extends BaseRepository<VehiclePostDocument> {
  constructor(
    @InjectModel(VehiclePostSchema.name)
    readonly vehiclePostModel: Model<VehiclePostDocument>,
  ) {
    super(vehiclePostModel);
  }
}
