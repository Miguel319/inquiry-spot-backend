import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreateVehicleMakeCommand,
  DeleteVehicleMakeCommand,
  UpdateVehicleMakeCommand,
} from "@/vehicle/application/commands/operations/vehicle-makes";
import {
  FetchPaginatedVehicleMakesQuery,
  FetchVehicleMakeByIdQuery,
} from "@/vehicle/application/queries";
import { VehicleMakeTranslations } from "@/vehicle/application/translations";
import {
  CreateVehicleMakeDto,
  UpdateVehicleMakeDto,
  VehicleMakeDto,
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

@Controller("vehicle-makes")
@UseFilters(new I18nValidationExceptionFilter())
export class VehicleMakesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<VehicleMakeDto>> {
    return this.queryBus.execute<
      FetchPaginatedVehicleMakesQuery,
      PaginatedQuery<VehicleMakeDto>
    >(
      new FetchPaginatedVehicleMakesQuery(paginationQuery, i18n as I18nContext),
    );
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<VehicleMakeDto> {
    return this.queryBus.execute<FetchVehicleMakeByIdQuery, VehicleMakeDto>(
      new FetchVehicleMakeByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createVehicleMake: CreateVehicleMakeDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<CreateVehicleMakeCommand, void>(
      new CreateVehicleMakeCommand(createVehicleMake, i18n as I18nContext),
    );

    return ApiResponse.create({
      res,
      message: i18n?.t(VehicleMakeTranslations.CREATE) || "",
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updateVehicleMakeDto: UpdateVehicleMakeDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdateVehicleMakeCommand, void>(
      new UpdateVehicleMakeCommand(
        _id,
        updateVehicleMakeDto,
        i18n as I18nContext,
      ),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(VehicleMakeTranslations.UPDATE) : "",
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
    await this.commandBus.execute<DeleteVehicleMakeCommand, boolean>(
      new DeleteVehicleMakeCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(VehicleMakeTranslations.DELETE) : "",
    });
  }
}
