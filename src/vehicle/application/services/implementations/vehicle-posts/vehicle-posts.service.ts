import {
  IMunicipalitiesService,
  IProvincesService,
  ISectorsService,
} from "@/common/application/services/contracts";
import { ColorTranslations } from "@/common/application/translations";
import { ColorEntityRepository } from "@/common/infrastructure/persistence/repositories";
import {
  FuelTranslations,
  TractionTranslations,
  TransmissionTranslations,
  VehicleMakeTranslations,
  VehiclePostTranslations,
  VehicleStatusTranslations,
} from "@/vehicle/application/translations";
import { VehiclePost } from "@/vehicle/domain/entities";
import { UpdateVehiclePostDto } from "@/vehicle/infrastructure/dtos";
import {
  FuelEntityRepository,
  TractionEntityRepository,
  TransmissionEntityRepository,
  VehicleMakesEntityRepository,
  VehiclePostEntityRepository,
  VehicleStatusEntityRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { I18nContext, I18nService } from "nestjs-i18n";
import { IVehiclePostsService } from "../../contracts";

@Injectable()
export class VehiclePostsService implements IVehiclePostsService {
  constructor(
    private readonly _vehiclePostEntityRepository: VehiclePostEntityRepository,
    private readonly _makeRepository: VehicleMakesEntityRepository,
    private readonly _transmissionRepository: TransmissionEntityRepository,
    private readonly _tractionRepository: TractionEntityRepository,
    private readonly _statusRepository: VehicleStatusEntityRepository,
    private readonly _colorRepository: ColorEntityRepository,
    private readonly _fuelRepository: FuelEntityRepository,
    @Inject("ISectorsService") private readonly _sectorService: ISectorsService,
    @Inject("IProvincesService")
    private readonly _provincesService: IProvincesService,
    @Inject("IMunicipalitiesService")
    private readonly _municipalyService: IMunicipalitiesService,
    private readonly _i18n: I18nService,
  ) {}

  async mapToEntities(
    vehiclePost: VehiclePost,
    i18n: I18nContext,
    operation: "create" | "edit",
    dto?: UpdateVehiclePostDto | undefined,
  ): Promise<void> {
    if (operation === "create") await this.mapToCreation(vehiclePost, i18n);
    else await this.mapToUpdate(vehiclePost, i18n, dto);
  }

  private async mapToCreation(
    vehiclePost: VehiclePost,
    i18n: I18nContext,
  ): Promise<void> {
    await this.mapToAddress(vehiclePost, i18n);
    await this.mapToExteriorColor(vehiclePost, i18n);
    await this.mapToInteriorColor(vehiclePost, i18n);
    await this.mapToFuelType(vehiclePost, i18n);
    await this.mapToMake(vehiclePost, i18n);
    await this.mapToStatus(vehiclePost, i18n);
    await this.mapToTraction(vehiclePost, i18n);
    await this.mapToTransmission(vehiclePost, i18n);
  }

  private async mapToUpdate(
    vehiclePost: VehiclePost,
    i18n: I18nContext,
    dto: UpdateVehiclePostDto | undefined,
  ): Promise<void> {
    if (dto?.make) await this.mapToMake(vehiclePost, i18n, dto);
    if (dto?.formalAddress || dto?.informalAddress)
      await this.mapToAddress(vehiclePost, i18n, dto);

    if (dto?.exteriorColor)
      await this.mapToExteriorColor(vehiclePost, i18n, dto);

    if (dto?.status) await this.mapToStatus(vehiclePost, i18n, dto);
    if (dto?.interiorColor)
      await this.mapToInteriorColor(vehiclePost, i18n, dto);

    if (dto?.fuelType) await this.mapToFuelType(vehiclePost, i18n, dto);

    if (dto?.traction) await this.mapToTraction(vehiclePost, i18n, dto);

    if (dto?.transmission) await this.mapToTransmission(vehiclePost, i18n, dto);
  }

  async findById(_id: string, i18n: I18nContext): Promise<VehiclePost> {
    const post = await this._vehiclePostEntityRepository.findByValue(
      _id,
      "_id",
    );

    if (!post)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehiclePostTranslations.NOT_FOUND)
          : this._i18n.t(VehiclePostTranslations.NOT_FOUND),
      );

    return post;
  }

  private async mapToMake(
    post: VehiclePost,
    i18n: I18nContext,
    dto?: UpdateVehiclePostDto,
  ) {
    const id = dto?.make ? dto.make : post.getMake()._id;

    const make = await this._makeRepository.findByValue(id, "_id");

    if (!make)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehicleMakeTranslations.NOT_FOUND)
          : this._i18n.t(VehicleMakeTranslations.NOT_FOUND),
      );

    post.setMake({
      _id: new Types.ObjectId(make.getId()),
      value: make.getName(),
    });
  }

  private async mapToTransmission(
    post: VehiclePost,
    i18n: I18nContext,
    dto?: UpdateVehiclePostDto,
  ) {
    const id = dto?.transmission || post.getTransmission()._id;

    const transmission = await this._transmissionRepository.findByValue(
      id,
      "_id",
    );

    if (!transmission)
      throw new NotFoundException(
        i18n
          ? i18n.t(TransmissionTranslations.NOT_FOUND)
          : this._i18n.t(TransmissionTranslations.NOT_FOUND),
      );

    post.setTransmission({
      _id: new Types.ObjectId(transmission.getId()),
      value: transmission.getName(),
    });
  }

  private async mapToFuelType(
    post: VehiclePost,
    i18n: I18nContext,
    dto?: UpdateVehiclePostDto,
  ) {
    const id = dto?.fuelType || post.getFuelType()._id;

    const fuel = await this._fuelRepository.findByValue(id, "_id");

    if (!fuel)
      throw new NotFoundException(
        i18n
          ? i18n.t(FuelTranslations.NOT_FOUND)
          : this._i18n.t(FuelTranslations.NOT_FOUND),
      );

    post.setFuelType({
      _id: new Types.ObjectId(fuel.getId()),
      value: fuel.getName(),
    });
  }

  private async mapToTraction(
    post: VehiclePost,
    i18n: I18nContext,
    dto?: UpdateVehiclePostDto,
  ) {
    const id = dto?.traction || post.getTraction()._id;

    const traction = await this._tractionRepository.findByValue(id, "_id");

    if (!traction)
      throw new NotFoundException(
        i18n
          ? i18n.t(TractionTranslations.NOT_FOUND)
          : this._i18n.t(TractionTranslations.NOT_FOUND),
      );

    post.setTraction({
      _id: new Types.ObjectId(traction.getId()),
      value: traction.getName(),
    });
  }

  private async mapToStatus(
    post: VehiclePost,
    i18n: I18nContext,
    dto?: UpdateVehiclePostDto,
  ) {
    const id = dto?.status || post.getStatus()._id;

    const status = await this._statusRepository.findByValue(id, "_id");

    if (!status)
      throw new NotFoundException(
        i18n
          ? i18n.t(VehicleStatusTranslations.NOT_FOUND)
          : this._i18n.t(VehicleStatusTranslations.NOT_FOUND),
      );

    post.setStatus({
      _id: new Types.ObjectId(status.getId()),
      value: status.getName(),
    });
  }

  private async mapToExteriorColor(
    post: VehiclePost,
    i18n: I18nContext,
    dto?: UpdateVehiclePostDto,
  ) {
    const id = dto?.exteriorColor || post.getExteriorColor()._id;

    const color = await this._colorRepository.findByValue(id, "_id");

    if (!color)
      throw new NotFoundException(
        i18n
          ? i18n.t(ColorTranslations.NOT_FOUND)
          : this._i18n.t(ColorTranslations.NOT_FOUND),
      );

    post.setExteriorColor({
      _id: new Types.ObjectId(color.getId()),
      value: color.getName(),
    });
  }

  private async mapToInteriorColor(
    post: VehiclePost,
    i18n: I18nContext,
    dto?: UpdateVehiclePostDto,
  ) {
    const id = dto?.interiorColor || post.getInteriorColor()._id;

    const color = await this._colorRepository.findByValue(id, "_id");

    if (!color)
      throw new NotFoundException(
        i18n
          ? i18n.t(ColorTranslations.NOT_FOUND)
          : this._i18n.t(ColorTranslations.NOT_FOUND),
      );

    post.setInteriorColor({
      _id: new Types.ObjectId(color.getId()),
      value: color.getName(),
    });
  }

  private async mapToFormalAddress(
    post: VehiclePost,
    i18n: I18nContext,
    dto?: UpdateVehiclePostDto,
  ) {
    const sectorId = dto?.formalAddress
      ? dto.formalAddress.sector._id
      : (post.getAddress().formal?.sector._id as unknown as string);

    const sector = await this._sectorService.findById(sectorId, i18n);

    const municipalityId = dto?.formalAddress
      ? dto.formalAddress.municipality._id
      : (post.getAddress().formal?.municipality as unknown as string);

    const municipality = await this._municipalyService.findById(
      municipalityId,
      i18n,
    );

    const provinceId = dto?.formalAddress
      ? dto.formalAddress.province._id
      : (post.getAddress().formal?.province._id as unknown as string);

    const province = await this._provincesService.findById(provinceId, i18n);

    post.setFormalAddress({
      addressLine1: post.getAddress().formal?.addressLine1 as unknown as string,
      municipality: {
        _id: new Types.ObjectId(municipality.getId()),
        value: municipality.getName(),
      },
      province: {
        _id: new Types.ObjectId(province.getId()),
        value: province.getName(),
      },
      sector: {
        _id: new Types.ObjectId(sector.getId()),
        value: sector.getName(),
      },
    });
  }

  private async mapToAddress(
    post: VehiclePost,
    i18n: I18nContext,
    dto?: UpdateVehiclePostDto,
  ) {
    const isFormalAddress =
      dto?.isFormalAddress || Boolean(post.getAddress().formal);

    if (isFormalAddress) {
      await this.mapToFormalAddress(post, i18n, dto);

      return;
    }

    post.setInformalAddress(post.getAddress().informal as string);
  }
}
