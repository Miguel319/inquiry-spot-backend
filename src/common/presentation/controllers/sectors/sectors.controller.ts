import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreateSectorCommand,
  DeleteSectorCommand,
  UpdateSectorCommand,
} from "@/common/application/commands";
import {
  FetchPaginatedSectorsQuery,
  FetchSectorByIdQuery,
} from "@/common/application/queries";
import { SectorTranslations } from "@/common/application/translations";
import {
  CreateSectorDto,
  UpdateSectorDto,
  SectorDto,
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

@Controller("sectors")
@UseFilters(new I18nValidationExceptionFilter())
export class SectorsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<SectorDto>> {
    return this.queryBus.execute<
      FetchPaginatedSectorsQuery,
      PaginatedQuery<SectorDto>
    >(new FetchPaginatedSectorsQuery(paginationQuery, i18n as I18nContext));
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<SectorDto> {
    return this.queryBus.execute<FetchSectorByIdQuery, SectorDto>(
      new FetchSectorByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createSectorDto: CreateSectorDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<CreateSectorCommand, void>(
      new CreateSectorCommand(createSectorDto, i18n as I18nContext),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(SectorTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updateVehicleDto: UpdateSectorDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdateSectorCommand, void>(
      new UpdateSectorCommand(_id, updateVehicleDto, i18n as I18nContext),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(SectorTranslations.UPDATE) : "",
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
    await this.commandBus.execute<DeleteSectorCommand, boolean>(
      new DeleteSectorCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(SectorTranslations.DELETE) : "",
    });
  }
}
