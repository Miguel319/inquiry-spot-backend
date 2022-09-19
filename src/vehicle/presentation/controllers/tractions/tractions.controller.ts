import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreateTractionCommand,
  DeleteTractionCommand,
  UpdateTractionCommand,
} from "@/vehicle/application/commands";
import {
  FetchPaginatedTractionsQuery,
  FetchTractionByIdQuery,
} from "@/vehicle/application/queries";
import { TractionTranslations } from "@/vehicle/application/translations";
import {
  CreateTractionDto,
  UpdateTractionDto,
  TractionDto,
} from "@/vehicle/infrastructure/dtos";
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

@Controller("tractions")
@UseFilters(new I18nValidationExceptionFilter())
export class TractionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<TractionDto>> {
    return this.queryBus.execute<
      FetchPaginatedTractionsQuery,
      PaginatedQuery<TractionDto>
    >(new FetchPaginatedTractionsQuery(paginationQuery, i18n as I18nContext));
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<TractionDto> {
    return this.queryBus.execute<FetchTractionByIdQuery, TractionDto>(
      new FetchTractionByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createTractionDto: CreateTractionDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<CreateTractionCommand, void>(
      new CreateTractionCommand(createTractionDto, i18n as I18nContext),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(TractionTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updateVehicleDto: UpdateTractionDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdateTractionCommand, void>(
      new UpdateTractionCommand(_id, updateVehicleDto, i18n as I18nContext),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(TractionTranslations.UPDATE) : "",
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
    await this.commandBus.execute<DeleteTractionCommand, boolean>(
      new DeleteTractionCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(TractionTranslations.DELETE) : "",
    });
  }
}
