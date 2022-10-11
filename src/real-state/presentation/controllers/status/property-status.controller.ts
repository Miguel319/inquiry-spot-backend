import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreatePropertyStatusCommand,
  DeletePropertyStatusCommand,
  UpdatePropertyStatusCommand,
} from "@/real-state/application/commands";
import {
  FetchPaginatedPropertyStatusQuery,
  FetchPropertyStatusByIdQuery,
} from "@/real-state/application/queries";
import { PropertyStatusTranslations } from "@/real-state/application/translations";
import {
  CreatePropertyStatusDto,
  UpdatePropertyStatusDto,
  PropertyStatusDto,
} from "@/real-state/infrastructure/dtos";
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

@Controller("property-status")
@UseFilters(new I18nValidationExceptionFilter())
export class PropertyStatusController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<PropertyStatusDto>> {
    return this.queryBus.execute<
      FetchPaginatedPropertyStatusQuery,
      PaginatedQuery<PropertyStatusDto>
    >(
      new FetchPaginatedPropertyStatusQuery(
        paginationQuery,
        i18n as I18nContext,
      ),
    );
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<PropertyStatusDto> {
    return this.queryBus.execute<
      FetchPropertyStatusByIdQuery,
      PropertyStatusDto
    >(new FetchPropertyStatusByIdQuery(_id, i18n as I18nContext));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createPropertyStatusDto: CreatePropertyStatusDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<CreatePropertyStatusCommand, void>(
      new CreatePropertyStatusCommand(
        createPropertyStatusDto,
        i18n as I18nContext,
      ),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(PropertyStatusTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updatePropertyDto: UpdatePropertyStatusDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdatePropertyStatusCommand, void>(
      new UpdatePropertyStatusCommand(
        _id,
        updatePropertyDto,
        i18n as I18nContext,
      ),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(PropertyStatusTranslations.UPDATE) : "",
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
    await this.commandBus.execute<DeletePropertyStatusCommand, boolean>(
      new DeletePropertyStatusCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(PropertyStatusTranslations.DELETE) : "",
    });
  }
}
