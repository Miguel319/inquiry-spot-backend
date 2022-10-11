import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreatePropertyTypeCommand,
  DeletePropertyTypeCommand,
  UpdatePropertyTypeCommand,
} from "@/real-state/application/commands";
import {
  FetchPaginatedPropertyTypesQuery,
  FetchPropertyTypeByIdQuery,
} from "@/real-state/application/queries";
import { PropertyTypeTranslations } from "@/real-state/application/translations";
import {
  CreatePropertyTypeDto,
  UpdatePropertyTypeDto,
  PropertyTypeDto,
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

@Controller("property-types")
@UseFilters(new I18nValidationExceptionFilter())
export class PropertyTypesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<PropertyTypeDto>> {
    return this.queryBus.execute<
      FetchPaginatedPropertyTypesQuery,
      PaginatedQuery<PropertyTypeDto>
    >(
      new FetchPaginatedPropertyTypesQuery(
        paginationQuery,
        i18n as I18nContext,
      ),
    );
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<PropertyTypeDto> {
    return this.queryBus.execute<FetchPropertyTypeByIdQuery, PropertyTypeDto>(
      new FetchPropertyTypeByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createPropertyTypeDto: CreatePropertyTypeDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<CreatePropertyTypeCommand, void>(
      new CreatePropertyTypeCommand(createPropertyTypeDto, i18n as I18nContext),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(PropertyTypeTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updatePropertyDto: UpdatePropertyTypeDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdatePropertyTypeCommand, void>(
      new UpdatePropertyTypeCommand(
        _id,
        updatePropertyDto,
        i18n as I18nContext,
      ),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(PropertyTypeTranslations.UPDATE) : "",
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
    await this.commandBus.execute<DeletePropertyTypeCommand, boolean>(
      new DeletePropertyTypeCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(PropertyTypeTranslations.DELETE) : "",
    });
  }
}
