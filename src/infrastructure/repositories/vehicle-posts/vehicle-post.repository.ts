import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "../../../infrastructure/repositories";
import { VehiclePostDocument } from "@/domain/entities";

@Injectable()
export class VehiclePostsRepository extends BaseRepository<VehiclePostDocument> {
  constructor(
    @InjectModel("VehiclePost")
    readonly vehiclePostModel: Model<VehiclePostDocument>,
  ) {
    super(vehiclePostModel);
  }
}
