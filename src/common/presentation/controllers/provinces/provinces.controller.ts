import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreateProvinceCommand,
  DeleteProvinceCommand,
  UpdateProvinceCommand,
} from "@/common/application/commands";
import {
  FetchPaginatedProvincesQuery,
  FetchProvinceByIdQuery,
} from "@/common/application/queries";
import { ProvinceTranslations } from "@/common/application/translations";
import {
  CreateProvinceDto,
  UpdateProvinceDto,
  ProvinceDto,
} from "@/common/infrastructure/dtos";
import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller("provinces")
@UseFilters(new I18nValidationExceptionFilter())
export class ProvincesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<ProvinceDto>> {
    return this.queryBus.execute<
      FetchPaginatedProvincesQuery,
      PaginatedQuery<ProvinceDto>
    >(new FetchPaginatedProvincesQuery(paginationQuery, i18n as I18nContext));
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<ProvinceDto> {
    return this.queryBus.execute<FetchProvinceByIdQuery, ProvinceDto>(
      new FetchProvinceByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createProvinceDto: CreateProvinceDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<CreateProvinceCommand, void>(
      new CreateProvinceCommand(createProvinceDto, i18n as I18nContext),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(ProvinceTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updateVehicleDto: UpdateProvinceDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdateProvinceCommand, void>(
      new UpdateProvinceCommand(_id, updateVehicleDto, i18n as I18nContext),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(ProvinceTranslations.UPDATE) : "",
    });
  }

  @Delete(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async delete(
    @Param("_id") _id: string,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<DeleteProvinceCommand, boolean>(
      new DeleteProvinceCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(ProvinceTranslations.DELETE) : "",
    });
  }
}
