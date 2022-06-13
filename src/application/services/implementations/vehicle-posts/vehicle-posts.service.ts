import { VehiclePost } from "@/domain/entities";
import { VehiclePostsRepository } from "../../../../infrastructure/repositories";
import { Injectable, NotFoundException } from "@nestjs/common";
import { IVehiclePostsService } from "../../contracts";

@Injectable()
export class VehiclePostsService implements IVehiclePostsService {
  constructor(private readonly _vehiclePostRepo: VehiclePostsRepository) {}

  async findAll(): Promise<VehiclePost[]> {
    return await this._vehiclePostRepo.find({});
  }

  async findById(_id: string): Promise<VehiclePost> {
    const vehiclePost: VehiclePost | null = await this._vehiclePostRepo.findOne(
      { _id },
    );

    if (!vehiclePost) throw new NotFoundException("Vehicle post not found.");

    return vehiclePost;
  }

  async create(vehiclePost: VehiclePost): Promise<VehiclePost> {
    return await this._vehiclePostRepo.create(vehiclePost);
  }

  async update(
    _id: string,
    vehiclePost: VehiclePost,
  ): Promise<VehiclePost | null> {
    return await this._vehiclePostRepo.findOneAndUpdate({ _id }, vehiclePost);
  }

  async delete(_id: string): Promise<boolean> {
    return await this._vehiclePostRepo.deleteOne({ _id });
  }

  async findFromSeller(id: string): Promise<VehiclePost> {
    throw new Error(`${id} Method not implemented.`);
  }
}
