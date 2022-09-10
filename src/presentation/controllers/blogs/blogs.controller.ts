import { IBlogsService } from "@/application/services/contracts";
import { Blog, BlogDocument } from "@/domain/entities/blog.entity";
import { ApiResponse } from "@/common/infrastructure/api";
import { CreateBlogDto } from "@/blogs/infrastructure/dtos/create-blog.dto";
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

@Controller("blogs")
export class BlogsController {
  constructor(
    @Inject("IBlogsService") private readonly blogsService: IBlogsService,
  ) {}

  @Get()
  async fetchAll(@Res() res: Response): Promise<Response> {
    const blogs = (await this.blogsService.findAll()) as BlogDocument[];

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
    const blog = await this.blogsService.create(blogDto as unknown as Blog);

    return ApiResponse.create({ res, data: blog });
  }
}
