import { EntityFactory } from "@/common/infrastructure/factories";
import { VehiclePostCreatedEvent } from "@/vehicle/application/events";
import { VehiclePost } from "@/vehicle/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { VehiclePostSchema } from "../../persistence/schemas";

@Injectable()
export class VehiclePostFactory implements EntityFactory<VehiclePost> {
  constructor(
    @InjectModel(VehiclePostSchema.name)
    private readonly _vehiclePostModel: Model<VehiclePostSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<VehiclePost> {
    const vehiclePost = new VehiclePost({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._vehiclePostModel.create(args[0]);

    vehiclePost.apply(new VehiclePostCreatedEvent(vehiclePost.getId()));

    return vehiclePost;
  }
}
