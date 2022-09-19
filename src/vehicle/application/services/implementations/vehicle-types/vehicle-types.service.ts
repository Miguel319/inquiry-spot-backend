/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaginationQuery } from "@/common/domain/types";
import { PaginatedQuery } from "@/common/infrastructure/util";
import {
  CreateVehicleTypeCommand,
  DeleteVehicleTypeCommand,
  UpdateVehicleTypeCommand,
} from "@/vehicle/application/commands";
import {
  FetchPaginatedVehicleTypesQuery,
  FetchVehicleTypeByIdQuery,
} from "@/vehicle/application/queries";
import {
  CreateVehicleTypeDto,
  UpdateVehicleTypeDto,
  VehicleTypeDto,
} from "@/vehicle/infrastructure/dtos";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { I18nContext } from "nestjs-i18n";
import { IVehicleTypesService } from "../../contracts/i-vehicle-type.service";

export class VehicleTypesService implements IVehicleTypesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(
    entity: CreateVehicleTypeDto,
    i18n?: I18nContext | undefined,
  ): Promise<void> {
    this.commandBus.execute<CreateVehicleTypeCommand, void>(
      new CreateVehicleTypeCommand(entity, i18n as I18nContext),
    );
  }

  async update(
    _id: string,
    entity: UpdateVehicleTypeDto,
    i18n?: I18nContext | undefined,
  ): Promise<void> {
    this.commandBus.execute<UpdateVehicleTypeCommand, void>(
      new UpdateVehicleTypeCommand(_id, entity, i18n as I18nContext),
    );
  }

  findAll(
    paginationQuery?: PaginationQuery | undefined,
    i18n?: I18nContext | undefined,
  ): Promise<PaginatedQuery<VehicleTypeDto>> {
    return this.queryBus.execute<
      FetchPaginatedVehicleTypesQuery,
      PaginatedQuery<VehicleTypeDto>
    >(
      new FetchPaginatedVehicleTypesQuery(
        paginationQuery as PaginationQuery,
        i18n as I18nContext,
      ),
    );
  }

  findById(
    _id: string,
    i18n?: I18nContext | undefined,
  ): Promise<VehicleTypeDto> {
    return this.queryBus.execute<FetchVehicleTypeByIdQuery, VehicleTypeDto>(
      new FetchVehicleTypeByIdQuery(_id, i18n as I18nContext),
    );
  }

  delete(_id: string, i18n?: I18nContext | undefined): Promise<boolean> {
    return this.commandBus.execute<DeleteVehicleTypeCommand, boolean>(
      new DeleteVehicleTypeCommand(_id, i18n as I18nContext),
    );
  }
}
