import { PaginationQuery } from "@/common/domain/types";
import { ApiResponse } from "@/common/infrastructure/api";
import { HasRoles } from "@/common/infrastructure/decorators";
import { PaginatedQuery } from "@/common/infrastructure/util";
import { Role } from "@/user/domain/types";
import { JwtAuthGuard } from "@/user/infrastructure/guards";
import {
  CreateVehiclePostCommand,
  DeleteVehiclePostCommand,
  UpdateVehiclePostCommand,
} from "@/vehicle/application/commands";
import {
  FetchPaginatedVehiclePostsQuery,
  FetchVehiclePostByIdQuery,
} from "@/vehicle/application/queries";
import { VehiclePostTranslations } from "@/vehicle/application/translations";
import {
  CreateVehiclePostDto,
  UpdateVehiclePostDto,
  VehiclePostDto,
} from "@/vehicle/infrastructure/dtos";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";
import { Response } from "express";

@Controller("vehicle-posts")
@UseFilters(new I18nValidationExceptionFilter())
export class VehiclePostsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQuery,
    @I18n() i18n?: I18nContext,
  ): Promise<PaginatedQuery<VehiclePostDto>> {
    return this.queryBus.execute<
      FetchPaginatedVehiclePostsQuery,
      PaginatedQuery<VehiclePostDto>
    >(
      new FetchPaginatedVehiclePostsQuery(paginationQuery, i18n as I18nContext),
    );
  }

  @Get(":_id")
  findById(
    @Param("_id") _id: string,
    @I18n() i18n?: I18nContext,
  ): Promise<VehiclePostDto> {
    return this.queryBus.execute<FetchVehiclePostByIdQuery, VehiclePostDto>(
      new FetchVehiclePostByIdQuery(_id, i18n as I18nContext),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async create(
    @Body() createVehiclePostDto: CreateVehiclePostDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<CreateVehiclePostCommand, void>(
      new CreateVehiclePostCommand(createVehiclePostDto, i18n as I18nContext),
    );

    return ApiResponse.create({
      message: i18n ? i18n.t(VehiclePostTranslations.CREATE) : "",
      res,
    });
  }

  @Put(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async update(
    @Param("_id") _id: string,
    @Body() updateVehicleDto: UpdateVehiclePostDto,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<UpdateVehiclePostCommand, void>(
      new UpdateVehiclePostCommand(_id, updateVehicleDto, i18n as I18nContext),
    );

    return ApiResponse.update({
      res,
      message: i18n ? i18n.t(VehiclePostTranslations.UPDATE) : "",
    });
  }

  @Delete(":_id")
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.ADMIN)
  async delete(
    @Param("_id") _id: string,
    @Res() res: Response,
    @I18n() i18n?: I18nContext,
  ) {
    await this.commandBus.execute<DeleteVehiclePostCommand, boolean>(
      new DeleteVehiclePostCommand(_id, i18n as I18nContext),
    );

    return ApiResponse.delete({
      res,
      message: i18n ? i18n.t(VehiclePostTranslations.DELETE) : "",
    });
  }
}

// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Inject,
//   Param,
//   Post,
//   Put,
//   Query,
//   Res,
//   UseFilters,
//   UseGuards,
// } from "@nestjs/common";
// import { Response } from "express";
// import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";
// import { JwtAuthGuard } from "../../../../user/infrastructure/guards";
// import { HasRoles } from "../../../../common/infrastructure/decorators";
// import { ApiResponse } from "@/common/infrastructure/api";
// import {
//   CreateVehiclePostDto,
//   UpdateVehiclePostDto,
// } from "@/vehicle/infrastructure/dtos";
// import { IVehiclePostsService } from "@/vehicle/application/services/contracts";
// import { VehiclePost, VehiclePostDocument } from "@/vehicle/domain";
// import { Role } from "@/user/domain/types";
// import { VehiclePostTranslations } from "@/vehicle/application/translations";
// import { PaginationQuery } from "@/common/domain/types/common";

// @Controller("vehicle-posts")
// @UseFilters(new I18nValidationExceptionFilter())
// export class VehiclePostsController {
//   constructor(
//     @Inject("IVehiclePostsService")
//     private readonly _vehiclePostsService: IVehiclePostsService,
//   ) {}

//   @Get()
//   async findAll(
//     @Query() paginationQuery: PaginationQuery,
//     @I18n() i18n?: I18nContext,
//   ) {
//     return this._vehiclePostsService.findAll(paginationQuery, i18n);
//   }

//   @Get("query/last-five")
//   async findLastFive() {
//     return this._vehiclePostsService.findLastFiveVehicles();
//   }

//   @Get(":_id")
//   async findById(
//     @Param("_id") _id: string,
//     @I18n() i18n?: I18nContext,
//   ): Promise<VehiclePost> {
//     return this._vehiclePostsService.findById(_id, i18n);
//   }

//   @Post()
//   @UseGuards(JwtAuthGuard)
//   @HasRoles(Role.MIXED, Role.SELLER)
//   async create(
//     @Body() vehiclePostDto: CreateVehiclePostDto,
//     @Res() res: Response,
//     @I18n() i18n?: I18nContext,
//   ): Promise<Response> {
//     if (vehiclePostDto.isOptional) return ApiResponse.getEmptyRes(res);

//     const vehiclePost = await this._vehiclePostsService.create?.(
//       vehiclePostDto as unknown as VehiclePostDocument,
//       i18n,
//     );

//     return ApiResponse.create({
//       res,
//       data: vehiclePost,
//       message: i18n ? i18n.t(VehiclePostTranslations.CREATE) : "",
//     });
//   }

//   @Put(":_id")
//   @UseGuards(JwtAuthGuard)
//   @HasRoles(Role.MIXED, Role.SELLER)
//   async update(
//     @Param("_id") _id: string,
//     @Body() vehiclePostDto: UpdateVehiclePostDto,
//     @Res() res: Response,
//     @I18n() i18n?: I18nContext,
//   ): Promise<Response> {
//     if (vehiclePostDto.isOptional) return ApiResponse.getEmptyRes(res);

//     const vehiclePost = await this._vehiclePostsService.update?.(
//       _id,
//       vehiclePostDto as unknown as VehiclePostDocument,
//       i18n,
//     );

//     return ApiResponse.update({
//       res,
//       data: vehiclePost,
//       message: i18n ? i18n.t(VehiclePostTranslations.UPDATE) : "",
//     });
//   }

//   @Delete(":_id")
//   @UseGuards(JwtAuthGuard)
//   @HasRoles(Role.MIXED, Role.SELLER)
//   async delete(
//     @Param("_id") _id: string,
//     @Res() res: Response,
//     @I18n() i18n?: I18nContext,
//   ): Promise<Response<unknown, Record<string, unknown>>> {
//     await this._vehiclePostsService.delete?.(_id, i18n);

//     return ApiResponse.delete({
//       res,
//       message: i18n ? i18n.t(VehiclePostTranslations.DELETE) : "",
//     });
//   }

//   @Get("seller/many/:seller")
//   @UseGuards(JwtAuthGuard)
//   findAllFromSeller(
//     @Param("seller") seller: string,
//     @Query() paginationQuery: PaginationQuery,
//     @I18n() i18n?: I18nContext,
//   ): Promise<VehiclePost[]> {
//     return this._vehiclePostsService.findAllFromSeller(
//       seller,
//       paginationQuery,
//       i18n,
//     );
//   }
// }
