import {
  PropertyPost,
  PropertyPostDocument,
  UserDocument,
} from "@/domain/entities";
import { PropertyPostsRepository } from "../../../../infrastructure/repositories";
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { IPropertyPostsService, IUsersService } from "../../contracts";
import { I18nContext, I18nService } from "nestjs-i18n";
import {
  PaginationQuery,
  PropertyPostsTranslations,
  SharedTranslations,
  UserTranslations,
} from "../../../../domain/types";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "../../../../infrastructure/common/util";

@Injectable()
export class PropertyPostsService implements IPropertyPostsService {
  constructor(
    private readonly _propertyPostRepo: PropertyPostsRepository,
    private readonly _i18n: I18nService,
    @Inject("IUsersService") private readonly _usersService: IUsersService,
  ) {}

  private getPaginationOptions(
    paginationQuery: PaginationQuery,
    i18n: I18nContext,
  ): PaginationOptions {
    return {
      ...getPaginationOptions({ ...paginationQuery }, i18n || this._i18n),
      select:
        "_id description buyingOption propertyType propertyStatus price seller primaryImage createdAt",
      sort: "-createdAt",
    };
  }

  async findAll(
    paginationQuery: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<PaginatedQuery<PropertyPostDocument>> {
    const options: PaginationOptions = this.getPaginationOptions(
      paginationQuery,
      i18n as I18nContext,
    );
    return (await this._propertyPostRepo.paginate(
      {},
      options,
    )) as unknown as PaginatedQuery<PropertyPostDocument>;
  }

  async findById(
    _id: string,
    i18n?: I18nContext,
  ): Promise<PropertyPostDocument> {
    const propertyPost: PropertyPost | null =
      await this._propertyPostRepo.findOne({ _id });

    if (!propertyPost) {
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyPostsTranslations.NOT_FOUND)
          : this._i18n.t(PropertyPostsTranslations.NOT_FOUND),
      );
    }
    return propertyPost as PropertyPostDocument;
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
    propertyPost: PropertyPost,
    i18n?: I18nContext,
  ): Promise<PropertyPostDocument> {
    const user = await this.findCurrentUser(i18n as I18nContext);

    if (!user.propertyPostsPublished) user.propertyPostsPublished = [];

    const newPropertyPost = await this._propertyPostRepo.create({
      ...propertyPost,
      seller: user._id,
    });

    user.propertyPostsPublished.push(newPropertyPost._id);

    await user.save();

    return newPropertyPost;
  }

  async update(
    _id: string,
    propertyPost: PropertyPost,
    i18n?: I18nContext,
  ): Promise<PropertyPostDocument | null> {
    const user = await this.findCurrentUser(i18n as I18nContext);

    const propertyPostFound = await this.findById(_id, i18n);

    if (propertyPostFound.seller !== user._id)
      throw new UnauthorizedException(
        i18n
          ? i18n.t(SharedTranslations.UNAUTHORIZED)
          : this._i18n.t(SharedTranslations.UNAUTHORIZED),
      );

    return await this._propertyPostRepo.findOneAndUpdate({ _id }, propertyPost);
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

    return await this._propertyPostRepo.deleteOne({ _id });
  }

  async findAllFromSeller(
    seller: string,
    paginationQuery: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<PropertyPost[]> {
    const options: PaginationOptions = this.getPaginationOptions(
      paginationQuery,
      i18n as I18nContext,
    );

    return await this._propertyPostRepo.paginate({ seller }, options);
  }
}
