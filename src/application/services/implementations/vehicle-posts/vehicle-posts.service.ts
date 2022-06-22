import { VehiclePost } from "@/domain/entities";
import { VehiclePostsRepository } from "../../../../infrastructure/repositories";
import { Injectable, NotFoundException } from "@nestjs/common";
import { IVehiclePostsService } from "../../contracts";
import { I18nContext, I18nService } from "nestjs-i18n";
import { PaginationQuery } from "@/domain/types";

import {
  getPaginationOptions,
  PaginationOptions,
} from "../../../../infrastructure/common/util";

@Injectable()
export class VehiclePostsService implements IVehiclePostsService {
  constructor(
    private readonly _vehiclePostRepo: VehiclePostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  private getPaginationOptions(
    paginationQuery: PaginationQuery,
  ): PaginationOptions {
    return {
      ...getPaginationOptions({ ...paginationQuery }),
      select:
        "_id description make model type price status seller primaryImage createdAt",
      sort: "-createdAt",
    };
  }

  async findAll(paginationQuery: PaginationQuery): Promise<VehiclePost[]> {
    const options: PaginationOptions =
      this.getPaginationOptions(paginationQuery);

    return await this._vehiclePostRepo.paginate({}, options);
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

  async findFromSeller(
    _id: string,
    seller: string,
    i18n?: I18nContext,
  ): Promise<VehiclePost> {
    const propertyPost: VehiclePost | null =
      await this._vehiclePostRepo.findOne({ seller, _id });

    if (!propertyPost)
      throw new NotFoundException(
        i18n
          ? i18n.t("validations.vehiclePost.notFound")
          : this._i18n.t("validations.vehiclePost.notFound"),
      );

    return propertyPost;
  }

  async findAllFromSeller(
    seller: string,
    paginationQuery: PaginationQuery,
  ): Promise<VehiclePost[]> {
    const options: PaginationOptions =
      this.getPaginationOptions(paginationQuery);

    return await this._vehiclePostRepo.paginate({ seller }, options);
  }
}
