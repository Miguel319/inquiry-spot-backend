import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import { IVehicleTypesService } from "@/vehicle-post/application/services/contracts";
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
import { Response } from "express";
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";

@Controller()
export class VehicleTypesController {
  constructor(private readonly _vehicleTypesService: IVehicleTypesService) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n: I18nContext,
  ): Promise<PaginatedQuery<VehicleTypeDto>> {
    return this._vehicleTypesService.findAll(paginationQuery, i18n);
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<VehicleTypeDto> {
    return this._vehicleTypesService.findById(_id, i18n);
  }

  @Post()
  @UseFilters(new I18nValidationExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createVehicleTypeDto: CreateVehicleTypeDto,
    @Res() res: Response,
    @I18n() i18n: I18nContext,
  ) {
    await this._vehicleTypesService.create(createVehicleTypeDto, i18n);

    return ApiResponse.create({
      message: i18n ? i18n.t(VehicleTypeTranslations.UPDATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseFilters(new I18nValidationExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updateVehicleDto: UpdateVehicleTypeDto,
    @Res() res: Response,
    @I18n() i18n: I18nContext,
  ) {
    await this._vehicleTypesService.update(_id, updateVehicleDto);

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(VehicleTypeTranslations.UPDATE) : "",
    });
  }

  @Delete(":_id")
  @UseFilters(new I18nValidationExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async delete(
    @Param("_id") _id: string,
    @Res() res: Response,
    @I18n() i18n: I18nContext,
  ) {
    await this._vehicleTypesService.delete(_id);

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(VehicleTypeTranslations.DELETE) : "",
    });
  }
}
