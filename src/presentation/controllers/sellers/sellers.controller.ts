import { ISellersService } from "@/application/services/contracts";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { PaginationQuery } from "@/domain/types";
import { UserDocument } from "@/user/infrastructure/persistence/schemas";
import { Controller, Get, Inject, Query } from "@nestjs/common";
import { I18n, I18nContext } from "nestjs-i18n";

@Controller("sellers")
export class SellersController {
  constructor(
    @Inject("ISellersService")
    private readonly _sellersService: ISellersService,
  ) {}

  @Get("properties")
  findPropertyPostsSellers(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<UserDocument>> {
    return this._sellersService.findPropertyPostsSellers(paginationQuery, i18n);
  }

  @Get("vehicles")
  findVehiclePostsSellers(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<UserDocument>> {
    return this._sellersService.findVehiclePostSellers(paginationQuery, i18n);
  }
}
