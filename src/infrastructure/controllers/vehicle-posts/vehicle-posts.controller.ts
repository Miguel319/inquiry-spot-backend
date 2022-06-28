import { IVehiclePostsService } from "../../../application/services/contracts";
import { VehiclePost } from "../../../domain/entities";
import { PaginationQuery } from "../../../domain/types/common/pagination-query";
import { ApiResponse } from "../../../infrastructure/common/api";
import {
  UpdateVehiclePostDto,
  CreateVehiclePostDto,
} from "../../../infrastructure/dtos";
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
import { VehiclePostTranslations } from "../../../domain/types";
import { JwtAuthGuard } from "../../../infrastructure/guards";

@Controller("vehicle-posts")
export class VehiclePostsController {
  constructor(
    @Inject("IVehiclePostsService")
    private readonly _vehiclePostsService: IVehiclePostsService,
  ) {}

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<VehiclePost[]> {
    return await this._vehiclePostsService.findAll(paginationQuery, i18n);
  }

  @Get(":_id")
  async findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<VehiclePost> {
    return await this._vehiclePostsService.findById(_id, i18n);
  }

  @Post()
  @UseFilters(new I18nValidationExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() vehiclePostDto: CreateVehiclePostDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    const vehiclePost = await this._vehiclePostsService.create?.(
      vehiclePostDto as unknown as VehiclePost,
      i18n,
    );

    return ApiResponse.create({
      res,
      data: vehiclePost,
      message: i18n ? i18n.t(VehiclePostTranslations.CREATE) : "",
    });
  }

  @Put(":_id")
  @UseFilters(new I18nValidationExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("_id") _id: string,
    @Body() vehiclePostDto: UpdateVehiclePostDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    const vehiclePost = await this._vehiclePostsService.update?.(
      _id,
      vehiclePostDto as unknown as VehiclePost,
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

  @Get(":_id/:seller")
  async findFromSeller(
    @Param("_id") _id: string,
    @Param("seller") seller: string,
    @I18n() i18n?: I18nContext,
  ): Promise<VehiclePost> {
    return await this._vehiclePostsService.findFromSeller(_id, seller, i18n);
  }

  @Get(":seller")
  async findAllFromSeller(
    @Param("seller") seller: string,
    @Query() paginationQuery: PaginationQuery,
  ): Promise<VehiclePost[]> {
    return await this._vehiclePostsService.findAllFromSeller(
      seller,
      paginationQuery,
    );
  }
}
