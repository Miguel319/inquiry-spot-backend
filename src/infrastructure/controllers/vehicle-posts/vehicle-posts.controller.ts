import { IVehiclePostsService } from "@/application/services/contracts/i-vehicle-post.service";
import { VehiclePost } from "@/domain/entities";
import { ApiResponse } from "@/infrastructure/common/api";
import { UpdateVehiclePostDto } from "@/infrastructure/dtos";
import { CreateVehiclePostDto } from "@/infrastructure/dtos/vehicle-posts/create-vehicle-post.dto";
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
  async findById(_id: string): Promise<VehiclePost> {
    return await this._vehiclePostsService.findById(_id);
  }

  @Post()
  async create(
    @Body() vehiclePostDto: CreateVehiclePostDto,
    @Res() res: Response,
  ): Promise<Response> {
    const vehiclePost = await this._vehiclePostsService.create?.(
      vehiclePostDto as unknown as VehiclePost,
    );

    return ApiResponse.createSuccessfully({ res, data: vehiclePost });
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

    return ApiResponse.updateSuccessfully({ res, data: vehiclePost });
  }

  @Delete(":_id")
  async delete(@Param("_id") _id: string, @Res() res: Response) {
    const postDeleted = await this._vehiclePostsService.delete?.(_id);

    return ApiResponse.deleteSuccessfully({ res, data: postDeleted });
  }
}
