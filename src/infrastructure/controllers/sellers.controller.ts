import { ISellersService } from "@/application/services/contracts";
import { UserDocument } from "@/domain/entities";
import { PaginationQuery } from "@/domain/types";
import { Controller, Get, Inject, Query } from "@nestjs/common";
import { I18n, I18nContext } from "nestjs-i18n";
import { PaginatedQuery } from "../common/util";

@Controller("sellers")
export class SellersController {
  constructor(
    @Inject("ISellersService")
    private readonly _sellersService: ISellersService,
  ) {}

  @Get("properties")
  async findPropertyPostsSellers(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<UserDocument>> {
    return await this._sellersService.findPropertyPostsSellers(
      paginationQuery,
      i18n,
    );
  }

  @Get("vehicles")
  async findVehiclePostsSellers(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<UserDocument>> {
    return await this._sellersService.findVehiclePostSellers(
      paginationQuery,
      i18n,
    );
  }
}
