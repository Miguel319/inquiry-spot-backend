import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreateColorCommand,
  DeleteColorCommand,
  UpdateColorCommand,
} from "@/common/application/commands";
import {
  FetchPaginatedColorsQuery,
  FetchColorByIdQuery,
} from "@/common/application/queries";
import { ColorTranslations } from "@/common/application/translations";
import {
  CreateColorDto,
  UpdateColorDto,
  ColorDto,
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

@Controller("colors")
@UseFilters(new I18nValidationExceptionFilter())
export class ColorsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<ColorDto>> {
    return this.queryBus.execute<
      FetchPaginatedColorsQuery,
      PaginatedQuery<ColorDto>
    >(new FetchPaginatedColorsQuery(paginationQuery, i18n as I18nContext));
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<ColorDto> {
    return this.queryBus.execute<FetchColorByIdQuery, ColorDto>(
      new FetchColorByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createColorDto: CreateColorDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<CreateColorCommand, void>(
      new CreateColorCommand(createColorDto, i18n as I18nContext),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(ColorTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updateVehicleDto: UpdateColorDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdateColorCommand, void>(
      new UpdateColorCommand(_id, updateVehicleDto, i18n as I18nContext),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(ColorTranslations.UPDATE) : "",
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
    await this.commandBus.execute<DeleteColorCommand, boolean>(
      new DeleteColorCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(ColorTranslations.DELETE) : "",
    });
  }
}
