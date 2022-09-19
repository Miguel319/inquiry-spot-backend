import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreateVehicleStatusCommand,
  DeleteVehicleStatusCommand,
  UpdateVehicleStatusCommand,
} from "@/vehicle/application/commands";
import {
  FetchPaginatedVehicleStatusQuery,
  FetchVehicleStatusByIdQuery,
} from "@/vehicle/application/queries";
import { VehicleStatusTranslations } from "@/vehicle/application/translations";
import {
  CreateVehicleStatusDto,
  UpdateVehicleStatusDto,
  VehicleStatusDto,
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

@Controller("vehicle-status")
@UseFilters(new I18nValidationExceptionFilter())
export class VehicleStatusController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<VehicleStatusDto>> {
    return this.queryBus.execute<
      FetchPaginatedVehicleStatusQuery,
      PaginatedQuery<VehicleStatusDto>
    >(
      new FetchPaginatedVehicleStatusQuery(
        paginationQuery,
        i18n as I18nContext,
      ),
    );
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<VehicleStatusDto> {
    return this.queryBus.execute<FetchVehicleStatusByIdQuery, VehicleStatusDto>(
      new FetchVehicleStatusByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createVehicleStatusDto: CreateVehicleStatusDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<CreateVehicleStatusCommand, void>(
      new CreateVehicleStatusCommand(
        createVehicleStatusDto,
        i18n as I18nContext,
      ),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(VehicleStatusTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updateVehicleDto: UpdateVehicleStatusDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdateVehicleStatusCommand, void>(
      new UpdateVehicleStatusCommand(
        _id,
        updateVehicleDto,
        i18n as I18nContext,
      ),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(VehicleStatusTranslations.UPDATE) : "",
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
    await this.commandBus.execute<DeleteVehicleStatusCommand, boolean>(
      new DeleteVehicleStatusCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(VehicleStatusTranslations.DELETE) : "",
    });
  }
}
