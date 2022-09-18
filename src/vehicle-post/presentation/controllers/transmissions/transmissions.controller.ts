import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import { CreateTransmissionCommand } from "@/vehicle-post/application/commands";
import { TransmissionTranslations } from "@/vehicle-post/application/translations";
import { CreateTransmissionDto } from "@/vehicle-post/infrastructure/dtos";
import {
  Body,
  Controller,
  Post,
  Res,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";
import { Response } from "express";

@Controller("transmissions")
@UseFilters(new I18nValidationExceptionFilter())
export class TransmissionController {
  constructor(private readonly commandBus: CommandBus) {}

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
}
