import { IBlogsService } from "@/application/services/contracts";
import { ApiResponse } from "@/common/infrastructure/api";
import { CreateBlogDto } from "@/blogs/infrastructure/dtos";
import { BlogsPresenter, PresenterFactory } from "@/infrastructure/presenters";
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { Response } from "express";

import { FileInterceptor } from "@nestjs/platform-express";
import { BlogDocument } from "@/blogs/persistence/schemas";

@Controller("blogs")
export class BlogsController {
  constructor(
    @Inject("IBlogsService") private readonly blogsService: IBlogsService,
  ) {}

  @Get()
  async fetchAll(@Res() res: Response): Promise<Response> {
    const blogs =
      (await this.blogsService.findAll()) as unknown as BlogDocument[];

    const blogsPresenter = PresenterFactory.getInstance(
      blogs,
      "blog",
    ) as BlogsPresenter[];

    return ApiResponse.get({ res, data: blogsPresenter, message: "" });
  }

  @Post()
  @UseInterceptors(FileInterceptor("photo", {}))
  async create(
    @Body()
    blogDto: CreateBlogDto,
    @Res() res: Response,
  ): Promise<Response> {
    const blog = await this.blogsService.create(
      blogDto as unknown as BlogDocument,
    );

    return ApiResponse.create({ res, data: blog });
  }
}
