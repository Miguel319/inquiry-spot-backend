import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreatePropertyBuyingOptionCommand,
  DeletePropertyBuyingOptionCommand,
  UpdatePropertyBuyingOptionCommand,
} from "@/real-state/application/commands";
import {
  FetchPaginatedPropertyBuyingOptionQuery,
  FetchPropertyBuyingOptionByIdQuery,
} from "@/real-state/application/queries";
import { PropertyBuyingOptionTranslations } from "@/real-state/application/translations";
import {
  CreatePropertyBuyingOptionDto,
  UpdatePropertyBuyingOptionDto,
  PropertyBuyingOptionDto,
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

@Controller("property-buying-options")
@UseFilters(new I18nValidationExceptionFilter())
export class PropertyBuyingOptionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<PropertyBuyingOptionDto>> {
    return this.queryBus.execute<
      FetchPaginatedPropertyBuyingOptionQuery,
      PaginatedQuery<PropertyBuyingOptionDto>
    >(
      new FetchPaginatedPropertyBuyingOptionQuery(
        paginationQuery,
        i18n as I18nContext,
      ),
    );
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<PropertyBuyingOptionDto> {
    return this.queryBus.execute<
      FetchPropertyBuyingOptionByIdQuery,
      PropertyBuyingOptionDto
    >(new FetchPropertyBuyingOptionByIdQuery(_id, i18n as I18nContext));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createPropertyBuyingOptionDto: CreatePropertyBuyingOptionDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<CreatePropertyBuyingOptionCommand, void>(
      new CreatePropertyBuyingOptionCommand(
        createPropertyBuyingOptionDto,
        i18n as I18nContext,
      ),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(PropertyBuyingOptionTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updatePropertyDto: UpdatePropertyBuyingOptionDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdatePropertyBuyingOptionCommand, void>(
      new UpdatePropertyBuyingOptionCommand(
        _id,
        updatePropertyDto,
        i18n as I18nContext,
      ),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(PropertyBuyingOptionTranslations.UPDATE) : "",
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
    await this.commandBus.execute<DeletePropertyBuyingOptionCommand, boolean>(
      new DeletePropertyBuyingOptionCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(PropertyBuyingOptionTranslations.DELETE) : "",
    });
  }
}
