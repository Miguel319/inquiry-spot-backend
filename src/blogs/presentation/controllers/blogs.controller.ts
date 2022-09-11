import { IUsersService } from "@/application/services/contracts";
import {
  CreateBlogCommand,
  UpdateBlogCommand,
} from "@/blogs/application/commands";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { User } from "@/domain/entities";
import { BlogTranslations, Role } from "@/domain/types";
import { JwtAuthGuard } from "@/infrastructure/guards";
import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Put,
  Res,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Response } from "express";
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";
import { CreateBlogDto, UpdateBlogDto } from "../../infrastructure/dtos";

@Controller("blogs")
export class BlogsController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject("IUsersService") private readonly _usersService: IUsersService,
  ) {}

  @Post()
  @UseFilters(new I18nValidationExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.SELLER, Role.MIXED)
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

  @Put(":_id")
  @UseFilters(new I18nValidationExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.SELLER, Role.MIXED)
  async updateBlog(
    @Param("_id") _id: string,
    @Body() blog: UpdateBlogDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    const currentUser = (await this._usersService.findCurrent()) as User;

    await this.commandBus.execute<UpdateBlogCommand, void>(
      new UpdateBlogCommand(_id, blog, currentUser, i18n as I18nContext),
    );

    return ApiResponse.create({
      res,
      message: i18n?.t?.(BlogTranslations.UPDATE) || "",
    });
  }
}
