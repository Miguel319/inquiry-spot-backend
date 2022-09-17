import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import { CreateVehicleMakeCommand } from "@/vehicle-post/application/commands/operations/vehicle-makes";
import { VehicleMakeTranslations } from "@/vehicle-post/application/translations";
import { CreateVehicleMakeDto } from "@/vehicle-post/infrastructure/dtos";
import {
  Body,
  Controller,
  Post,
  Res,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Response } from "express";
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";

@Controller("vehicle-makes")
@UseFilters(new I18nValidationExceptionFilter())
export class VehicleMakesController {
  constructor(private readonly commandBus: CommandBus) {}

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
}
