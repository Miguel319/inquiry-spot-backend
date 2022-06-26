import { IPropertyPostsService } from "@/application/services/contracts";
import { PropertyPost } from "../../../domain/entities";
import {
  PaginationQuery,
  PropertyPostsTranslations,
} from "../../../domain/types";
import { ApiResponse } from "../../../infrastructure/common/api";
import {
  CreatePropertyPostDto,
  UpdatePropertyPostDto,
} from "../../../infrastructure/dtos";
import {
  Body,
  Controller,
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
import { JwtAuthGuard } from "../../../infrastructure/guards";

@Controller("property-posts")
export class PropertyPostsController {
  constructor(
    @Inject("IPropertyPostsService")
    private readonly _propertyPostsService: IPropertyPostsService,
  ) {}

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ) {
    return await this._propertyPostsService.findAll(paginationQuery, i18n);
  }

  @Get(":_id")
  async findById(@Param("_id") _id: string) {
    return await this._propertyPostsService.findById(_id);
  }

  @Post()
  @UseFilters(new I18nValidationExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() propertyPostDto: CreatePropertyPostDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    const propertyPost = await this._propertyPostsService.create?.(
      propertyPostDto as unknown as PropertyPost,
    );

    return ApiResponse.create({
      res,
      data: propertyPost,
      message: i18n ? i18n.t(PropertyPostsTranslations.CREATE) : "",
    });
  }

  @Put(":_id")
  @UseFilters(new I18nValidationExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("_id") _id: string,
    @Body() propertyPostDto: UpdatePropertyPostDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    const propertyPost = await this._propertyPostsService.update?.(
      _id,
      propertyPostDto as unknown as PropertyPost,
    );

    return ApiResponse.create({
      res,
      data: propertyPost,
      message: i18n ? i18n.t(PropertyPostsTranslations.UPDATE) : "",
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param("_id") _id: string,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    await this._propertyPostsService.delete?.(_id);

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(PropertyPostsTranslations.DELETE) : "",
    });
  }

  @Get(":seller")
  async findAllFromSeller(
    @Param("seller") seller: string,
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PropertyPost[]> {
    return await this._propertyPostsService.findAllFromSeller(
      seller,
      paginationQuery,
      i18n,
    );
  }
}
