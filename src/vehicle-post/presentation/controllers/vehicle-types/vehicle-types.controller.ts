import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreateVehicleTypeCommand,
  DeleteVehicleTypeCommand,
  UpdateVehicleTypeCommand,
} from "@/vehicle-post/application/commands";
import {
  FetchPaginatedVehicleTypesQuery,
  FetchVehicleTypeByIdQuery,
} from "@/vehicle-post/application/queries";
import { VehicleTypeTranslations } from "@/vehicle-post/application/translations";
import {
  CreateVehicleTypeDto,
  UpdateVehicleTypeDto,
  VehicleTypeDto,
} from "@/vehicle-post/infrastructure/dtos";
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

@Controller("vehicle-types")
@UseFilters(new I18nValidationExceptionFilter())
export class VehicleTypesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<VehicleTypeDto>> {
    return this.queryBus.execute<
      FetchPaginatedVehicleTypesQuery,
      PaginatedQuery<VehicleTypeDto>
    >(
      new FetchPaginatedVehicleTypesQuery(paginationQuery, i18n as I18nContext),
    );
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<VehicleTypeDto> {
    return this.queryBus.execute<FetchVehicleTypeByIdQuery, VehicleTypeDto>(
      new FetchVehicleTypeByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createVehicleTypeDto: CreateVehicleTypeDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<CreateVehicleTypeCommand, void>(
      new CreateVehicleTypeCommand(createVehicleTypeDto, i18n as I18nContext),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(VehicleTypeTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updateVehicleDto: UpdateVehicleTypeDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdateVehicleTypeCommand, void>(
      new UpdateVehicleTypeCommand(_id, updateVehicleDto, i18n as I18nContext),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(VehicleTypeTranslations.UPDATE) : "",
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
    await this.commandBus.execute<DeleteVehicleTypeCommand, boolean>(
      new DeleteVehicleTypeCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(VehicleTypeTranslations.DELETE) : "",
    });
  }
}
