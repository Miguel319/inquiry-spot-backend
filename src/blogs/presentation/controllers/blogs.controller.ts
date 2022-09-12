import { IUsersService } from "@/application/services/contracts";
import {
  CreateBlogCommand,
  UpdateBlogCommand,
} from "@/blogs/application/commands";
import {
  FetchBlogBySlugQuery,
  FetchPaginatedBlogsQuery,
} from "@/blogs/application/queries";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { User } from "@/domain/entities";
import { BlogTranslations, Role } from "@/domain/types";
import { JwtAuthGuard } from "@/infrastructure/guards";
import {
  Body,
  Controller,
  Get,
  Inject,
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
import {
  BlogDto,
  CreateBlogDto,
  UpdateBlogDto,
} from "../../infrastructure/dtos";

@Controller("blogs")
@UseFilters(new I18nValidationExceptionFilter())
export class BlogsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject("IUsersService") private readonly _usersService: IUsersService,
  ) {}

  @Get()
  async fetchAllPaginated(
    @Query("page") page: string,
    @Query("perPage") perPage: string,
    @Query("title") title: string,
    @Query("slug") slug: string,
    @Query("category") category: string,
    @Query("tags") tags: string[],
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<BlogDto>> {
    const query = {
      page: Number(page),
      perPage: Number(perPage),
      title,
      slug,
      category,
      tags,
    };

    return this.queryBus.execute<
      FetchPaginatedBlogsQuery,
      PaginatedQuery<BlogDto>
    >(new FetchPaginatedBlogsQuery(query, i18n as I18nContext));
  }

  @Get(":slug")
  async getBySlug(
    @Param("slug") slug: string,
    @I18n() i18n?: I18nContext,
  ): Promise<BlogDto> {
    return this.queryBus.execute<FetchBlogBySlugQuery, BlogDto>(
      new FetchBlogBySlugQuery(slug, i18n as I18nContext),
    );
  }

  @Post()
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
