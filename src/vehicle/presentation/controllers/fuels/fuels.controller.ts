import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreateFuelCommand,
  DeleteFuelCommand,
  UpdateFuelCommand,
} from "@/vehicle/application/commands/operations/fuels";
import {
  FetchPaginatedFuelsQuery,
  FetchFuelByIdQuery,
} from "@/vehicle/application/queries";
import { FuelTranslations } from "@/vehicle/application/translations";
import {
  CreateFuelDto,
  UpdateFuelDto,
  FuelDto,
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
import { Response } from "express";
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";

@Controller("fuels")
@UseFilters(new I18nValidationExceptionFilter())
export class FuelsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<FuelDto>> {
    return this.queryBus.execute<
      FetchPaginatedFuelsQuery,
      PaginatedQuery<FuelDto>
    >(new FetchPaginatedFuelsQuery(paginationQuery, i18n as I18nContext));
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<FuelDto> {
    return this.queryBus.execute<FetchFuelByIdQuery, FuelDto>(
      new FetchFuelByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createFuel: CreateFuelDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<CreateFuelCommand, void>(
      new CreateFuelCommand(createFuel, i18n as I18nContext),
    );

    return ApiResponse.create({
      res,
      message: i18n?.t(FuelTranslations.CREATE) || "",
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updateFuelDto: UpdateFuelDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdateFuelCommand, void>(
      new UpdateFuelCommand(_id, updateFuelDto, i18n as I18nContext),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(FuelTranslations.UPDATE) : "",
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
    await this.commandBus.execute<DeleteFuelCommand, boolean>(
      new DeleteFuelCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(FuelTranslations.DELETE) : "",
    });
  }
}
