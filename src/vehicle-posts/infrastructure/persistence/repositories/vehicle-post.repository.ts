import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { VehiclePostDocument } from "@/domain/entities";
import { BaseRepository } from "@/infrastructure/repositories";

@Injectable()
export class VehiclePostsRepository extends BaseRepository<VehiclePostDocument> {
  constructor(
    @InjectModel("VehiclePost")
    readonly vehiclePostModel: Model<VehiclePostDocument>,
  ) {
    super(vehiclePostModel);
  }
}
