import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreatePropertyPostCommand,
  DeletePropertyPostCommand,
  UpdatePropertyPostCommand,
} from "@/real-state/application/commands";
import {
  FetchPaginatedPropertyPostsQuery,
  FetchPropertyPostByIdQuery,
  FetchPropertyPostsFromSellerQuery,
} from "@/real-state/application/queries";
import {
  AllPropertyPostsDto,
  CreatePropertyPostDto,
  UpdatePropertyPostDto,
  PropertyPostDto,
} from "@/real-state/infrastructure/dtos";
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
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";
import { Response } from "express";
import { IUsersService } from "@/user/application/services/contracts";
import { Types } from "mongoose";
import { PropertyPostsTranslations } from "@/real-state/application/translations";

@Controller("property-posts")
@UseFilters(new I18nValidationExceptionFilter())
export class PropertyPostsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject("IUsersService") private readonly _usersService: IUsersService,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<AllPropertyPostsDto>> {
    return this.queryBus.execute<
      FetchPaginatedPropertyPostsQuery,
      PaginatedQuery<AllPropertyPostsDto>
    >(
      new FetchPaginatedPropertyPostsQuery(
        paginationQuery,
        i18n as I18nContext,
      ),
    );
  }

  // @Get("query/last-five")
  // async queryLastFive(): Promise<AllPropertyPostsDto> {
  //   return this.queryBus.execute<
  //     FetchLastFivePropertyPostsQuery,
  //     AllPropertyPostsDto
  //   >(new FetchLastFivePropertyPostsQuery());
  // }

  @Get("seller/many/:seller")
  @UseGuards(JwtAuthGuard)
  async getAllFromUser(
    @Query() paginationQuery: PaginationQuery,
    @Param("seller") seller: string,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<AllPropertyPostsDto>> {
    return this.queryBus.execute<
      FetchPropertyPostsFromSellerQuery,
      PaginatedQuery<AllPropertyPostsDto>
    >(
      new FetchPropertyPostsFromSellerQuery(
        seller,
        paginationQuery,
        i18n as I18nContext,
      ),
    );
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<PropertyPostDto> {
    return this.queryBus.execute<FetchPropertyPostByIdQuery, PropertyPostDto>(
      new FetchPropertyPostByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.MIXED, Role.SELLER)
  async create(
    @Body() createPropertyPostDto: CreatePropertyPostDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    const currentUser = await this._usersService.findCurrent(i18n);

    createPropertyPostDto.seller = {
      _id: new Types.ObjectId(currentUser?._id),
      value: currentUser?.name as string,
    };

    await this.commandBus.execute<CreatePropertyPostCommand, void>(
      new CreatePropertyPostCommand(createPropertyPostDto, i18n as I18nContext),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(PropertyPostsTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.MIXED, Role.SELLER)
  async update(
    @Param("_id") _id: string,
    @Body() updatePropertyDto: UpdatePropertyPostDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    const currentUser = await this._usersService.findCurrent(i18n);

    const hasCommas = _id.includes(",");

    const formattedId = hasCommas ? _id.replace(",", "") : _id;

    if ((updatePropertyDto as any)?._id) delete (updatePropertyDto as any)?._id;

    updatePropertyDto.seller = {
      _id: new Types.ObjectId(currentUser?._id),
      value: currentUser?.name as string,
    };

    await this.commandBus.execute<UpdatePropertyPostCommand, void>(
      new UpdatePropertyPostCommand(
        formattedId,
        updatePropertyDto,
        i18n as I18nContext,
      ),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(PropertyPostsTranslations.UPDATE) : "",
    });
  }

  @Delete(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.MIXED, Role.SELLER)
  async delete(
    @Param("_id") _id: string,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<DeletePropertyPostCommand, boolean>(
      new DeletePropertyPostCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(PropertyPostsTranslations.DELETE) : "",
    });
  }
}
