import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreateTransmissionCommand,
  DeleteTransmissionCommand,
  UpdateTransmissionCommand,
} from "@/vehicle-post/application/commands";
import { TransmissionTranslations } from "@/vehicle-post/application/translations";
import {
  CreateTransmissionDto,
  TransmissionDto,
  UpdateTransmissionDto,
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
import { PaginationQuery } from "@/common/domain/types";
import { PaginatedQuery } from "@/common/infrastructure/util";
import {
  FetchPaginatedTransmissionsQuery,
  FetchTransmissionByIdQuery,
} from "@/vehicle-post/application/queries";

@Controller("transmissions")
@UseFilters(new I18nValidationExceptionFilter())
export class TransmissionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<TransmissionDto>> {
    return this.queryBus.execute<
      FetchPaginatedTransmissionsQuery,
      PaginatedQuery<TransmissionDto>
    >(
      new FetchPaginatedTransmissionsQuery(
        paginationQuery,
        i18n as I18nContext,
      ),
    );
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<TransmissionDto> {
    return this.queryBus.execute<FetchTransmissionByIdQuery, TransmissionDto>(
      new FetchTransmissionByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createTransmissionDto: CreateTransmissionDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    await this.commandBus.execute<CreateTransmissionCommand, void>(
      new CreateTransmissionCommand(createTransmissionDto, i18n as I18nContext),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(TransmissionTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseFilters(new I18nValidationExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updateVehicleDto: UpdateTransmissionDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdateTransmissionCommand, void>(
      new UpdateTransmissionCommand(_id, updateVehicleDto, i18n as I18nContext),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(TransmissionTranslations.UPDATE) : "",
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
    await this.commandBus.execute<DeleteTransmissionCommand, boolean>(
      new DeleteTransmissionCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(TransmissionTranslations.DELETE) : "",
    });
  }
}
