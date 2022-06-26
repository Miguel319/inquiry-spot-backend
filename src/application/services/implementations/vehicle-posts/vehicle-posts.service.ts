import { UserDocument, VehiclePost } from "@/domain/entities";
import { VehiclePostsRepository } from "../../../../infrastructure/repositories";
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { IUsersService, IVehiclePostsService } from "../../contracts";
import { I18nContext, I18nService } from "nestjs-i18n";
import {
  PaginationQuery,
  SharedTranslations,
  UserTranslations,
  VehiclePostTranslations,
} from "../../../../domain/types";

import {
  getPaginationOptions,
  PaginationOptions,
} from "../../../../infrastructure/common/util";

@Injectable()
export class VehiclePostsService implements IVehiclePostsService {
  constructor(
    private readonly _vehiclePostRepo: VehiclePostsRepository,
    private readonly _i18n: I18nService,
    @Inject("IUsersService") private readonly _usersService: IUsersService,
  ) {}

  private getPaginationOptions(
    paginationQuery: PaginationQuery,
    i18n?: I18nContext,
  ): PaginationOptions {
    return {
      ...getPaginationOptions({ ...paginationQuery }, i18n || this._i18n),
      select:
        "_id description make model type price status seller primaryImage createdAt",
      sort: "-createdAt",
    };
  }

  async findAll(
    paginationQuery: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<VehiclePost[]> {
    const options: PaginationOptions = this.getPaginationOptions(
      paginationQuery,
      i18n as I18nContext,
    );

    return await this._vehiclePostRepo.paginate({}, options);
  }

  async findById(_id: string, i18n?: I18nContext): Promise<VehiclePost> {
    const vehiclePost: VehiclePost | null = await this._vehiclePostRepo.findOne(
      { _id },
    );

    if (!vehiclePost)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehiclePostTranslations.NOT_FOUND)
          : this._i18n.t(VehiclePostTranslations.NOT_FOUND),
      );

    return vehiclePost;
  }

  private async findCurrentUser(i18n: I18nContext): Promise<UserDocument> {
    const user = (await this._usersService.findCurrent(i18n)) as UserDocument;

    if (!user)
      throw new NotFoundException(
        i18n
          ? i18n.t(UserTranslations.NOT_FOUND)
          : this._i18n.t(UserTranslations.NOT_FOUND),
      );

    return user;
  }

  async create(
    vehiclePost: VehiclePost,
    i18n?: I18nContext,
  ): Promise<VehiclePost> {
    const user = await this.findCurrentUser(i18n as I18nContext);

    if (!user.vehiclePostsPublished) user.vehiclePostsPublished = [];

    const newPropertyPost = await this._vehiclePostRepo.create({
      ...vehiclePost,
      seller: user._id,
    });

    user.vehiclePostsPublished.push(newPropertyPost._id);

    await user.save();

    return newPropertyPost;
  }

  async update(
    _id: string,
    vehiclePost: VehiclePost,
    i18n?: I18nContext,
  ): Promise<VehiclePost | null> {
    const user = await this.findCurrentUser(i18n as I18nContext);

    const vehiclePostFound = await this.findById(_id, i18n);

    if (vehiclePostFound.seller !== user._id)
      throw new UnauthorizedException(
        i18n
          ? i18n.t(SharedTranslations.UNAUTHORIZED)
          : this._i18n.t(SharedTranslations.UNAUTHORIZED),
      );

    return await this._vehiclePostRepo.findOneAndUpdate({ _id }, vehiclePost);
  }

  async delete(_id: string, i18n?: I18nContext): Promise<boolean> {
    const user = await this.findCurrentUser(i18n as I18nContext);

    const propertyPost = await this.findById(_id);

    if (propertyPost.seller !== user._id)
      throw new UnauthorizedException(
        i18n
          ? i18n.t(SharedTranslations.UNAUTHORIZED)
          : this._i18n.t(SharedTranslations.UNAUTHORIZED),
      );

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
          ? i18n.t(VehiclePostTranslations.NOT_FOUND)
          : this._i18n.t(VehiclePostTranslations.NOT_FOUND),
      );

    return propertyPost;
  }

  async findAllFromSeller(
    seller: string,
    paginationQuery: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<VehiclePost[]> {
    const options: PaginationOptions = this.getPaginationOptions(
      paginationQuery,
      i18n as I18nContext,
    );

    return await this._vehiclePostRepo.paginate({ seller }, options);
  }
}
