import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "@/infrastructure/repositories";
import { VehiclePostDocument } from "../schemas";

@Injectable()
export class VehiclePostsRepository extends BaseRepository<VehiclePostDocument> {
  constructor(
    @InjectModel("VehiclePost")
    readonly vehiclePostModel: Model<VehiclePostDocument>,
  ) {
    super(vehiclePostModel);
  }
}
