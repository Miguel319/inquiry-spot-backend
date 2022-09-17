import { EntityFactory } from "@/common/infrastructure/persistence/factories";
import { VehicleTypeCreatedEvent } from "@/vehicle-post/application/events";
import { VehicleTypeTranslations } from "@/vehicle-post/application/translations";
import { VehicleType } from "@/vehicle-post/domain/entities";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { I18nContext, I18nService } from "nestjs-i18n";
import { CreateVehicleTypeDto } from "../../dtos";
import { VehicleTypeSchema } from "../../persistence/schemas";

@Injectable()
export class VehicleTypeFactory implements EntityFactory<VehicleType> {
  constructor(
    @InjectModel(VehicleTypeSchema.name)
    private readonly _vehicleTypes: Model<VehicleTypeSchema>,
    private readonly _i18n: I18nService,
  ) {}

  private async validateInput(
    vehicleType: CreateVehicleTypeDto,
    i18n: I18nContext,
  ) {
    const vehicleTypeFound = await this._vehicleTypes.findOne({
      $or: [
        { "name.es": vehicleType.name.es },
        { "name.en": vehicleType.name.en },
      ],
    });

    if (vehicleTypeFound)
      throw new BadRequestException(
        i18n
          ? i18n.t(VehicleTypeTranslations.NAME_UNIQUE)
          : this._i18n.t(VehicleTypeTranslations.NAME_UNIQUE),
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any): Promise<VehicleType> {
    const vehicleType = new VehicleType({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this.validateInput(args[0], args[1]);

    await this._vehicleTypes.create(args[0]);

    vehicleType.apply(
      new VehicleTypeCreatedEvent(vehicleType.getId(), vehicleType.getName()),
    );

    return vehicleType;
  }
}
