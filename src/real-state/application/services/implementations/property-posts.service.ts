import {
  IMunicipalitiesService,
  IProvincesService,
  ISectorsService,
} from "@/common/application/services/contracts";
import { ColorTranslations } from "@/common/application/translations";
import { ColorEntityRepository } from "@/common/infrastructure/persistence/repositories";
import {
  PropertyStatusTranslations,
  PropertyTypeTranslations,
  PropertyBuyingOptionTranslations,
} from "@/real-state/application/translations";
import { PropertyPost } from "@/real-state/domain/entities";
import { UpdatePropertyPostDto } from "@/real-state/infrastructure/dtos";
import {
  PropertyPostEntityRepository,
  PropertyStatusEntityRepository,
  PropertyTypeEntityRepository,
  PropertyBuyingOptionEntityRepository,
} from "@/real-state/infrastructure/persistence/repositories";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { I18nContext, I18nService } from "nestjs-i18n";
import { IPropertyPostsService } from "../contracts";

@Injectable()
export class PropertyPostsService implements IPropertyPostsService {
  constructor(
    private readonly propertyPostEntityRepository: PropertyPostEntityRepository,
    private readonly _statusRepository: PropertyStatusEntityRepository,
    private readonly _colorRepository: ColorEntityRepository,
    private readonly _buyingOptionRepository: PropertyBuyingOptionEntityRepository,
    private readonly propertyTypeRepository: PropertyTypeEntityRepository,
    @Inject("ISectorsService") private readonly _sectorService: ISectorsService,
    @Inject("IProvincesService")
    private readonly _provincesService: IProvincesService,
    @Inject("IMunicipalitiesService")
    private readonly _municipalyService: IMunicipalitiesService,
    private readonly _i18n: I18nService,
  ) {}

  async mapToEntities(
    vehiclePost: PropertyPost,
    i18n: I18nContext,
    operation: "create" | "edit",
    dto?: UpdatePropertyPostDto | undefined,
  ): Promise<void> {
    if (operation === "create") await this.mapToCreation(vehiclePost, i18n);
    else await this.mapToUpdate(vehiclePost, i18n, dto);
  }

  private async mapToCreation(
    vehiclePost: PropertyPost,
    i18n: I18nContext,
  ): Promise<void> {
    await this.mapToAddress(vehiclePost, i18n);
    await this.mapToExteriorColor(vehiclePost, i18n);
    await this.mapToInteriorColor(vehiclePost, i18n);
    await this.mapToType(vehiclePost, i18n);
    await this.mapToStatus(vehiclePost, i18n);
    await this.mapToBuyingOption(vehiclePost, i18n);
  }

  private async mapToUpdate(
    vehiclePost: PropertyPost,
    i18n: I18nContext,
    dto: UpdatePropertyPostDto | undefined,
  ): Promise<void> {
    if (dto?.formalAddress || dto?.informalAddress)
      await this.mapToAddress(vehiclePost, i18n, dto);

    if (dto?.exteriorColor)
      await this.mapToExteriorColor(vehiclePost, i18n, dto);

    if (dto?.status) await this.mapToStatus(vehiclePost, i18n, dto);
    if (dto?.interiorColor)
      await this.mapToInteriorColor(vehiclePost, i18n, dto);

    if (dto?.type) await this.mapToType(vehiclePost, i18n, dto);

    if (dto?.buyingOption) await this.mapToBuyingOption(vehiclePost, i18n, dto);
  }

  async findById(_id: string, i18n: I18nContext): Promise<PropertyPost> {
    const cleanId = _id.replace(",", "");

    const post = await this.propertyPostEntityRepository.findByValue(
      cleanId,
      "_id",
    );

    if (!post)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyStatusTranslations.NOT_FOUND)
          : this._i18n.t(PropertyStatusTranslations.NOT_FOUND),
      );

    return post;
  }

  private async mapToType(
    post: PropertyPost,
    i18n: I18nContext,
    dto?: UpdatePropertyPostDto,
  ) {
    const id = dto?.type ? dto.type : post.getType()._id;

    const type = await this.propertyTypeRepository.findByValue(id, "_id");

    if (!type)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyTypeTranslations.NOT_FOUND)
          : this._i18n.t(PropertyTypeTranslations.NOT_FOUND),
      );

    post.setType({
      _id: new Types.ObjectId(type.getId()),
      value: type.getName(),
    });
  }

  private async mapToBuyingOption(
    post: PropertyPost,
    i18n: I18nContext,
    dto?: UpdatePropertyPostDto,
  ) {
    const id = dto?.buyingOption || post.getBuyingOption()._id;

    const buyingOption = await this._buyingOptionRepository.findByValue(
      id,
      "_id",
    );

    if (!buyingOption)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyBuyingOptionTranslations.NOT_FOUND)
          : this._i18n.t(PropertyBuyingOptionTranslations.NOT_FOUND),
      );

    post.setBuyingOption({
      _id: new Types.ObjectId(buyingOption.getId()),
      value: buyingOption.getName(),
    });
  }

  private async mapToStatus(
    post: PropertyPost,
    i18n: I18nContext,
    dto?: UpdatePropertyPostDto,
  ) {
    const id = dto?.status || post.getStatus()._id;

    const status = await this._statusRepository.findByValue(id, "_id");

    if (!status)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyStatusTranslations.NOT_FOUND)
          : this._i18n.t(PropertyStatusTranslations.NOT_FOUND),
      );

    post.setStatus({
      _id: new Types.ObjectId(status.getId()),
      value: status.getName(),
    });
  }

  private async mapToExteriorColor(
    post: PropertyPost,
    i18n: I18nContext,
    dto?: UpdatePropertyPostDto,
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
      hexValue: color.getHexValue(),
    });
  }

  private async mapToInteriorColor(
    post: PropertyPost,
    i18n: I18nContext,
    dto?: UpdatePropertyPostDto,
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
      hexValue: color.getHexValue(),
    });
  }

  private async mapToFormalAddress(
    post: PropertyPost,
    i18n: I18nContext,
    dto?: UpdatePropertyPostDto,
  ) {
    const sectorId = dto?.isFormalAddress
      ? dto.formalAddress.sector
      : (post.getAddress().formal?.sector._id as unknown as string);

    const sector = await this._sectorService.findById(sectorId, i18n);

    const municipalityId = dto?.formalAddress
      ? dto.formalAddress.municipality
      : (post.getAddress().formal?.municipality._id as unknown as string);

    const municipality = await this._municipalyService.findById(
      municipalityId,
      i18n,
    );

    const provinceId = dto?.isFormalAddress
      ? dto.formalAddress.province
      : (post.getAddress?.().formal?.province._id as unknown as string);

    const province = await this._provincesService.findById(provinceId, i18n);

    post.setFormalAddress({
      addressLine1: dto?.isFormalAddress
        ? dto.formalAddress.addressLine1
        : (post.getAddress().formal?.addressLine1 as unknown as string),
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
    post: PropertyPost,
    i18n: I18nContext,
    dto?: UpdatePropertyPostDto,
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
