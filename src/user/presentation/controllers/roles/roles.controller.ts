import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreateRoleCommand,
  DeleteRoleCommand,
  UpdateRoleCommand,
} from "@/user/application/commands";
import {
  FetchPaginatedRolesQuery,
  FetchRoleByIdQuery,
} from "@/user/application/queries";
import { RoleTranslations } from "@/user/application/translations";
import {
  CreateRoleDto,
  UpdateRoleDto,
  RoleDto,
} from "@/user/infrastructure/dtos";
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

@Controller("roles")
@UseFilters(new I18nValidationExceptionFilter())
export class RolesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<RoleDto>> {
    return this.queryBus.execute<
      FetchPaginatedRolesQuery,
      PaginatedQuery<RoleDto>
    >(new FetchPaginatedRolesQuery(paginationQuery, i18n as I18nContext));
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<RoleDto> {
    return this.queryBus.execute<FetchRoleByIdQuery, RoleDto>(
      new FetchRoleByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createRoleDto: CreateRoleDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<CreateRoleCommand, void>(
      new CreateRoleCommand(createRoleDto, i18n as I18nContext),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(RoleTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updateVehicleDto: UpdateRoleDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdateRoleCommand, void>(
      new UpdateRoleCommand(_id, updateVehicleDto, i18n as I18nContext),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(RoleTranslations.UPDATE) : "",
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
    await this.commandBus.execute<DeleteRoleCommand, boolean>(
      new DeleteRoleCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(RoleTranslations.DELETE) : "",
    });
  }
}
