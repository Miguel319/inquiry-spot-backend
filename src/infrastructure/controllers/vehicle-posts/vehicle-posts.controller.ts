import { IVehiclePostsService } from "@/application/services/contracts";
import { VehiclePost } from "@/domain/entities";
import { ApiResponse } from "@/infrastructure/common/api";
import {
  UpdateVehiclePostDto,
  CreateVehiclePostDto,
} from "@/infrastructure/dtos";
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

@Controller("vehicle-posts")
export class VehiclePostsController {
  constructor(
    @Inject("IVehiclePostsService")
    private readonly _vehiclePostsService: IVehiclePostsService,
  ) {}

  @Get()
  async getAll() {
    return await this._vehiclePostsService.findAll();
  }

  @Get(":id")
  async findById(_id: string, @I18n() i18n: I18nContext): Promise<VehiclePost> {
    return await this._vehiclePostsService.findById(_id, i18n);
  }

  @Post()
  async create(
    @Body() vehiclePostDto: CreateVehiclePostDto,
    @Res() res: Response,
  ): Promise<Response> {
    const vehiclePost = await this._vehiclePostsService.create?.(
      vehiclePostDto as unknown as VehiclePost,
    );

    return ApiResponse.create({ res, data: vehiclePost });
  }

  @Put(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() vehiclePostDto: UpdateVehiclePostDto,
    @Res() res: Response,
  ) {
    const vehiclePost = await this._vehiclePostsService.update?.(
      _id,
      vehiclePostDto as unknown as VehiclePost,
    );

    return ApiResponse.update({ res, data: vehiclePost });
  }

  @Delete(":_id")
  async delete(@Param("_id") _id: string, @Res() res: Response) {
    const postDeleted = await this._vehiclePostsService.delete?.(_id);

    return ApiResponse.delete({ res, data: postDeleted });
  }
}
