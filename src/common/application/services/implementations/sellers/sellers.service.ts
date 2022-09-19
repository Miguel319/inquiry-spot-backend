import { PaginationQuery } from "@/common/domain/types/common";
import {
  getPaginationOptions,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { Injectable } from "@nestjs/common";
import { I18nContext, I18nService } from "nestjs-i18n";
import { ISellersService } from "../../contracts";
import { UsersRepository } from "@/user/infrastructure/persistence/repositories/user";
import { UserDocument } from "@/user/infrastructure/persistence/schemas";

@Injectable()
export class SellersService implements ISellersService {
  constructor(
    private readonly _usersRepository: UsersRepository,
    private readonly _i18n: I18nService,
  ) {}

  private getSellerPaginationOptions(
    paginationQuery: PaginationQuery,
    type: "property" | "vehicle",
    i18n?: I18nContext,
  ): PaginationOptions {
    return {
      ...getPaginationOptions(
        { ...paginationQuery, perPage: 50 },
        i18n || this._i18n,
      ),
      select: `_id image name email address createdAt ${
        type === "property" ? "propertyPostsPublished" : "vehiclePostsPublished"
      }`,
      sort: "-createdAt",
    };
  }

  async findPropertyPostsSellers(
    paginationQuery?: PaginationQuery,
    i18n?: I18nContext,
  ): Promise<PaginatedQuery<UserDocument>> {
    const options = this.getSellerPaginationOptions(
      paginationQuery as PaginationQuery,
      "property",
      i18n,
    );

    return (await this._usersRepository.paginate(
      { propertyPostsPublished: { $gte: 1 } },
      options,
    )) as unknown as Promise<PaginatedQuery<UserDocument>>;
  }

  async findVehiclePostSellers(
    paginationQuery: PaginationQuery,
    i18n: I18nContext,
  ): Promise<PaginatedQuery<UserDocument>> {
    const options = this.getSellerPaginationOptions(
      paginationQuery,
      "vehicle",
      i18n,
    );

    return (await this._usersRepository.paginate(
      { vehiclePostsPublished: { $gte: 1 } },
      options,
    )) as unknown as PaginatedQuery<UserDocument>;
  }
}
