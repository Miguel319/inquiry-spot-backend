import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";
import { JwtAuthGuard } from "../../../user/infrastructure/guards";
import { HasRoles } from "../../../common/infrastructure/decorators";
import { ApiResponse } from "@/common/infrastructure/api";
import {
  CreateVehiclePostDto,
  UpdateVehiclePostDto,
} from "@/vehicle-post/infrastructure/dtos";
import { IVehiclePostsService } from "@/vehicle-post/application/services/contracts";
import { VehiclePost, VehiclePostDocument } from "@/vehicle-post/domain";
import { Role } from "@/user/domain/types";
import { VehiclePostTranslations } from "@/vehicle-post/application/translations";
import { PaginationQuery } from "@/common/domain/types/common";

@Controller("vehicle-posts")
@UseFilters(new I18nValidationExceptionFilter())
export class VehiclePostsController {
  constructor(
    @Inject("IVehiclePostsService")
    private readonly _vehiclePostsService: IVehiclePostsService,
  ) {}

  @Get()
  findAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ) {
    return this._vehiclePostsService.findAll(paginationQuery, i18n);
  }

  @Get(":_id")
  async findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<VehiclePost> {
    return this._vehiclePostsService.findById(_id, i18n);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.MIXED, Role.SELLER)
  async create(
    @Body() vehiclePostDto: CreateVehiclePostDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    if (vehiclePostDto.isOptional) return ApiResponse.getEmptyRes(res);

    const vehiclePost = await this._vehiclePostsService.create?.(
      vehiclePostDto as unknown as VehiclePostDocument,
      i18n,
    );

    return ApiResponse.create({
      res,
      data: vehiclePost,
      message: i18n ? i18n.t(VehiclePostTranslations.CREATE) : "",
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.MIXED, Role.SELLER)
  async update(
    @Param("_id") _id: string,
    @Body() vehiclePostDto: UpdateVehiclePostDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    if (vehiclePostDto.isOptional) return ApiResponse.getEmptyRes(res);

    const vehiclePost = await this._vehiclePostsService.update?.(
      _id,
      vehiclePostDto as unknown as VehiclePostDocument,
      i18n,
    );

    return ApiResponse.update({
      res,
      data: vehiclePost,
      message: i18n ? i18n.t(VehiclePostTranslations.UPDATE) : "",
    });
  }

  @Delete(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.MIXED, Role.SELLER)
  async delete(
    @Param("_id") _id: string,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    await this._vehiclePostsService.delete?.(_id, i18n);

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(VehiclePostTranslations.DELETE) : "",
    });
  }

  @Get("seller/many/:seller")
  @UseGuards(JwtAuthGuard)
  findAllFromSeller(
    @Param("seller") seller: string,
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<VehiclePost[]> {
    return this._vehiclePostsService.findAllFromSeller(
      seller,
      paginationQuery,
      i18n,
    );
  }
}
