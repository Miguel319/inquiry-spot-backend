import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreateVehiclePostCommand,
  DeleteVehiclePostCommand,
  UpdateVehiclePostCommand,
} from "@/vehicle/application/commands";
import {
  FetchPaginatedVehiclePostsQuery,
  FetchVehiclePostByIdQuery,
  FetchVehiclePostsFromSellerQuery,
} from "@/vehicle/application/queries";
import { VehiclePostTranslations } from "@/vehicle/application/translations";
import {
  CreateVehiclePostDto,
  UpdateVehiclePostDto,
  VehiclePostDto,
} from "@/vehicle/infrastructure/dtos";
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

@Controller("vehicle-posts")
@UseFilters(new I18nValidationExceptionFilter())
export class VehiclePostsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject("IUsersService") private readonly _usersService: IUsersService,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<VehiclePostDto>> {
    return this.queryBus.execute<
      FetchPaginatedVehiclePostsQuery,
      PaginatedQuery<VehiclePostDto>
    >(
      new FetchPaginatedVehiclePostsQuery(paginationQuery, i18n as I18nContext),
    );
  }

  @Get("seller/many/:seller")
  @UseGuards(JwtAuthGuard)
  async getAllFromUser(
    @Query() paginationQuery: PaginationQuery,
    @Param("seller") seller: string,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<VehiclePostDto>> {
    return this.queryBus.execute<
      FetchVehiclePostsFromSellerQuery,
      PaginatedQuery<VehiclePostDto>
    >(
      new FetchVehiclePostsFromSellerQuery(
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
  ): Promise<VehiclePostDto> {
    return this.queryBus.execute<FetchVehiclePostByIdQuery, VehiclePostDto>(
      new FetchVehiclePostByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.MIXED, Role.SELLER)
  async create(
    @Body() createVehiclePostDto: CreateVehiclePostDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    const currentUser = await this._usersService.findCurrent(i18n);

    createVehiclePostDto.seller = {
      _id: new Types.ObjectId(currentUser?._id),
      value: currentUser?.name as string,
    };

    await this.commandBus.execute<CreateVehiclePostCommand, void>(
      new CreateVehiclePostCommand(createVehiclePostDto, i18n as I18nContext),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(VehiclePostTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.MIXED, Role.SELLER)
  async update(
    @Param("_id") _id: string,
    @Body() updateVehicleDto: UpdateVehiclePostDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    const currentUser = await this._usersService.findCurrent(i18n);

    updateVehicleDto.seller = {
      _id: new Types.ObjectId(currentUser?._id),
      value: currentUser?.name as string,
    };

    await this.commandBus.execute<UpdateVehiclePostCommand, void>(
      new UpdateVehiclePostCommand(_id, updateVehicleDto, i18n as I18nContext),
    );

    return ApiResponse.update({
      res,
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
  ) {
    await this.commandBus.execute<DeleteVehiclePostCommand, boolean>(
      new DeleteVehiclePostCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(VehiclePostTranslations.DELETE) : "",
    });
  }
}
