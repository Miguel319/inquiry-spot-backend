import {
  CreateBlogCommand,
  DeleteBlogCommand,
  UpdateBlogCommand,
} from "@/blog/application/commands";
import {
  FetchBlogByIdQuery,
  FetchBlogBySlugQuery,
  FetchPaginatedBlogsQuery,
} from "@/blog/application/queries";
import { BlogTranslations } from "@/blog/application/translations";
import { IBlogValuesQuery } from "@/blog/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { IUsersService } from "@/user/application/services/contracts";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import { User } from "@/user/infrastructure/persistence/schemas";
import {
  Body,
  Controller,
  Delete,
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
    @Query() { category, page, perPage, slug, tags, title }: IBlogValuesQuery,
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

  @Get("by-slug/:slug")
  async getBySlug(
    @Param("slug") slug: string,
    @I18n() i18n?: I18nContext,
  ): Promise<BlogDto> {
    return this.queryBus.execute<FetchBlogBySlugQuery, BlogDto>(
      new FetchBlogBySlugQuery(slug, i18n as I18nContext),
    );
  }

  @Get("by-id/:_id")
  async getById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<BlogDto> {
    return this.queryBus.execute<FetchBlogByIdQuery, BlogDto>(
      new FetchBlogByIdQuery(_id, i18n as I18nContext),
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

  @Put("by-id/:_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.SELLER, Role.MIXED)
  async updateBlogById(
    @Param("_id") _id: string,
    @Body() blog: UpdateBlogDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    const currentUser = (await this._usersService.findCurrent()) as User;

    await this.commandBus.execute<UpdateBlogCommand, void>(
      new UpdateBlogCommand(_id, "_id", blog, currentUser, i18n as I18nContext),
    );

    return ApiResponse.update({
      res,
      message: i18n?.t?.(BlogTranslations.UPDATE) || "",
    });
  }

  @Put("by-slug/:slug")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.SELLER, Role.MIXED)
  async updateBlogBySlug(
    @Param("slug") slug: string,
    @Body() blog: UpdateBlogDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    const currentUser = (await this._usersService.findCurrent()) as User;

    await this.commandBus.execute<UpdateBlogCommand, void>(
      new UpdateBlogCommand(
        slug,
        "slug",
        blog,
        currentUser,
        i18n as I18nContext,
      ),
    );

    return ApiResponse.update({
      res,
      message: i18n?.t?.(BlogTranslations.UPDATE) || "",
    });
  }

  @Delete("by-slug/:slug")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.SELLER, Role.MIXED)
  async deleteBlogBySlug(
    @Param("slug") slug: string,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    const currentUser = (await this._usersService.findCurrent()) as User;

    await this.commandBus.execute<DeleteBlogCommand, boolean>(
      new DeleteBlogCommand(slug, "slug", currentUser, i18n as I18nContext),
    );

    return ApiResponse.update({
      res,
      message: i18n?.t?.(BlogTranslations.UPDATE) || "",
    });
  }

  @Delete("by-id/:_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.SELLER, Role.MIXED)
  async deleteBlogById(
    @Param("_id") _id: string,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ): Promise<Response> {
    const currentUser = (await this._usersService.findCurrent()) as User;

    await this.commandBus.execute<DeleteBlogCommand, boolean>(
      new DeleteBlogCommand(_id, "_id", currentUser, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n?.t?.(BlogTranslations.DELETE) || "",
    });
  }
}
