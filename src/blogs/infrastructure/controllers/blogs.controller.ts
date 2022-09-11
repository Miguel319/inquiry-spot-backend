import { IUsersService } from "@/application/services/contracts";
import { CreateBlogCommand } from "@/blogs/application/commands";
import { ApiResponse } from "@/common/infrastructure/api";
import { User } from "@/domain/entities";
import { BlogTranslations } from "@/domain/types";
import { JwtAuthGuard } from "@/infrastructure/guards";
import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Response } from "express";
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";
import { CreateBlogDto } from "../dtos";

@Controller("blogs")
export class BlogsController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject("IUsersService") private readonly _usersService: IUsersService,
  ) {}

  @Post()
  @UseFilters(new I18nValidationExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async createBlog(
    @Body() blog: CreateBlogDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    const currentUser = (await this._usersService.findCurrent()) as User;

    await this.commandBus.execute<CreateBlogCommand, void>(
      new CreateBlogCommand(blog, currentUser, i18n as I18nContext),
    );

    return ApiResponse.create({
      res,
      message: i18n?.t?.(BlogTranslations.CREATE) || "",
    });
  }
}
