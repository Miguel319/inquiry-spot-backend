import { VehiclePost } from "@/domain/entities";
import { VehiclePostsRepository } from "../../../../infrastructure/repositories";
import { Injectable, NotFoundException } from "@nestjs/common";
import { IVehiclePostsService } from "../../contracts";
import { I18nContext, I18nService } from "nestjs-i18n";

@Injectable()
export class VehiclePostsService implements IVehiclePostsService {
  constructor(
    private readonly _vehiclePostRepo: VehiclePostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  async findAll(): Promise<VehiclePost[]> {
    return await this._vehiclePostRepo.find({});
  }

  async findById(_id: string, i18n?: I18nContext): Promise<VehiclePost> {
    const vehiclePost: VehiclePost | null = await this._vehiclePostRepo.findOne(
      { _id },
    );

    if (!vehiclePost)
      throw new NotFoundException(
        i18n
          ? i18n.t("validations.vehiclePost.notFound")
          : this._i18n.t("validations.vehiclePost.notFound"),
      );

    return vehiclePost;
  }

  async create(vehiclePost: VehiclePost): Promise<VehiclePost> {
    return await this._vehiclePostRepo.create(vehiclePost);
  }

  async update(
    _id: string,
    vehiclePost: VehiclePost,
    i18n?: I18nContext,
  ): Promise<VehiclePost | null> {
    await this.findById(_id, i18n); // Throws error if not found

    return await this._vehiclePostRepo.findOneAndUpdate({ _id }, vehiclePost);
  }

  async delete(_id: string): Promise<boolean> {
    return await this._vehiclePostRepo.deleteOne({ _id });
  }

  async findFromSeller(id: string): Promise<VehiclePost> {
    throw new Error(`${id} Method not implemented.`);
  }
}
