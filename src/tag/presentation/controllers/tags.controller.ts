import { ApiResponse } from "@/common/infrastructure/api";
import { PresenterFactory } from "@/common/infrastructure/presenters";
import { ITagsService } from "@/tag/application/services/contracts";
import { CreateTagDto } from "@/tag/infrastructure/dtos/mutations";
import { Tag, TagDocument } from "@/tag/infrastructure/persistence/schemas";
import { TagsPresenter } from "@/tag/infrastructure/dtos";
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { I18n, I18nContext } from "nestjs-i18n";

@Controller("tags")
export class TagsController {
  constructor(
    @Inject("ITagsService")
    private readonly tagsService: ITagsService,
  ) {}

  @Get()
  async fetchAll(@Res() res: Response): Promise<Response> {
    const tags = (await this.tagsService.findAll()) as TagDocument[];

    const tagsPresenter: TagsPresenter[] = PresenterFactory.getInstance(
      tags,
      "tag",
    ) as TagsPresenter[];

    return ApiResponse.get({ data: tagsPresenter, res });
  }

  @Get(":slug")
  async fetchBySlug(
    @Res() res: Response,
    @Param("slug") slug: string,
    @I18n() i18n: I18nContext,
  ): Promise<Response> {
    const tag: Tag = await this.tagsService.findBySlug(slug, i18n);

    const tagPresenter: TagsPresenter = PresenterFactory.getInstance(
      tag as TagDocument,
      "tag",
    ) as TagsPresenter;

    return ApiResponse.get({ data: tagPresenter, res });
  }

  @Post()
  async create(
    @Res() res: Response,
    @Body() tagsDto: CreateTagDto,
  ): Promise<Response> {
    const tag = await this.tagsService.create(tagsDto as TagDocument);

    const tagPresenter: TagsPresenter = PresenterFactory.getInstance(
      tag as TagDocument,
      "tag",
    ) as TagsPresenter;

    return ApiResponse.create({
      data: tagPresenter,
      res,
      message: "Tag created successfully!",
    });
  }

  @Put(":slug")
  async update(
    @Res() res: Response,
    @Param("slug") slug: string,
    @Body() tagsDto: CreateTagDto,
    @I18n() i18n: I18nContext,
  ): Promise<Response> {
    const tag: Tag | null = await this.tagsService.update(
      slug,
      tagsDto as Tag,
      i18n,
    );

    const tagPresenter: TagsPresenter = PresenterFactory.getInstance(
      tag as TagDocument,
      "tag",
    ) as TagsPresenter;

    return ApiResponse.update({
      res,
      data: tagPresenter,
      message: "Tag updated successfully!",
    });
  }

  @Delete(":slug")
  async delete(
    @Res() res: Response,
    @Param("slug") slug: string,
  ): Promise<Response> {
    await this.tagsService.delete(slug);

    return ApiResponse.delete({ res, message: "Tag deleted successfully!" });
  }
}
