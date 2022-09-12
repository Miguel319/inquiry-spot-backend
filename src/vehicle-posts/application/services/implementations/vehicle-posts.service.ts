import {
  UserDocument,
  VehiclePost,
  VehiclePostDocument,
} from "@/domain/entities";
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { IVehiclePostsService } from "../contracts";
import { I18nContext, I18nService } from "nestjs-i18n";
import {
  PaginationQuery,
  SharedTranslations,
  UserTranslations,
  VehiclePostTranslations,
} from "@/domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { IUsersService } from "@/application/services/contracts";
import { VehiclePostsRepository } from "@/vehicle-posts/infrastructure/persistence/repositories";

@Injectable()
export class VehiclePostsService implements IVehiclePostsService {
  constructor(
    private readonly _vehiclePostRepo: VehiclePostsRepository,
    private readonly _i18n: I18nService,
    @Inject("IUsersService") private readonly _usersService: IUsersService,
  ) {}

  private getVehiclePostPaginationOptions(
    paginationQuery: PaginationQuery,
    i18n?: I18nContext,
  ): PaginationOptions {
    return {
      ...getPaginationOptions({ ...paginationQuery }, i18n || this._i18n),
      select:
        "_id make model price type transmission use status seller primaryImage createdAt",
      sort: "-createdAt",
    };
  }

  async findAll(
    paginationQuery: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<PaginatedQuery<VehiclePostDocument>> {
    const options: PaginationOptions = this.getVehiclePostPaginationOptions(
      paginationQuery,
      i18n as I18nContext,
    );

    return (await this._vehiclePostRepo.paginate(
      {},
      options,
    )) as unknown as PaginatedQuery<VehiclePostDocument>;
  }

  async findById(
    _id: string,
    i18n?: I18nContext,
  ): Promise<VehiclePostDocument> {
    const vehiclePost: VehiclePost | null = await this._vehiclePostRepo.findOne(
      { _id },
    );

    if (!vehiclePost)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehiclePostTranslations.NOT_FOUND)
          : this._i18n.t(VehiclePostTranslations.NOT_FOUND),
      );

    return vehiclePost as VehiclePostDocument;
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
  ): Promise<VehiclePostDocument> {
    const user = await this.findCurrentUser(i18n as I18nContext);

    if (!user.vehiclePostsPublished) user.vehiclePostsPublished = [];

    const newVehiclePost = await this._vehiclePostRepo.create({
      ...vehiclePost,
      seller: user._id,
    });

    user.vehiclePostsPublished.push(newVehiclePost._id);

    await user.save();

    return newVehiclePost;
  }

  async update(
    _id: string,
    vehiclePost: VehiclePost,
    i18n?: I18nContext,
  ): Promise<VehiclePostDocument | null> {
    const user = await this.findCurrentUser(i18n as I18nContext);

    const vehiclePostFound = await this.findById(_id, i18n);

    if (vehiclePostFound.seller !== user._id)
      throw new UnauthorizedException(
        i18n
          ? i18n.t(SharedTranslations.UNAUTHORIZED)
          : this._i18n.t(SharedTranslations.UNAUTHORIZED),
      );

    return this._vehiclePostRepo.findOneAndUpdate({ _id }, vehiclePost);
  }

  async delete(_id: string, i18n?: I18nContext): Promise<boolean> {
    const user = await this.findCurrentUser(i18n as I18nContext);

    const vehiclePost = await this.findById(_id, i18n);

    if (vehiclePost.seller !== user._id)
      throw new UnauthorizedException(
        i18n
          ? i18n.t(SharedTranslations.UNAUTHORIZED)
          : this._i18n.t(SharedTranslations.UNAUTHORIZED),
      );

    return this._vehiclePostRepo.deleteOne({ _id });
  }

  async findAllFromSeller(
    seller: string,
    paginationQuery: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<VehiclePost[]> {
    const options: PaginationOptions = this.getVehiclePostPaginationOptions(
      paginationQuery,
      i18n as I18nContext,
    );

    return this._vehiclePostRepo.paginate({ seller }, options);
  }
}
