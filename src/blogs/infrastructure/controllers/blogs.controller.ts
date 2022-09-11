import { CreateBlogCommand } from "@/blogs/application/commands";
import { ApiResponse } from "@/common/infrastructure/api";
import { BlogTranslations } from "@/domain/types";
import { Body, Controller, Post, Res, UseFilters } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Response } from "express";
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";
import { CreateBlogDto } from "../dtos";

@Controller("blogs")
export class BlogsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseFilters(new I18nValidationExceptionFilter())
  async createBlog(
    @Body() blog: CreateBlogDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    await this.commandBus.execute<CreateBlogCommand, void>(
      new CreateBlogCommand(blog),
    );

    return ApiResponse.create({
      res,
      message: i18n ? i18n?.t(BlogTranslations.CREATE) : "",
    });
  }
}
