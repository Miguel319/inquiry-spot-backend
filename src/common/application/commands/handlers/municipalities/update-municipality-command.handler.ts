import { MunicipalityUpdatedEvent } from "@/common/application/events";
import {
  MunicipalityTranslations,
  ProvinceTranslations,
} from "@/common/application/translations";
import { Municipality } from "@/common/domain/entities";
import { IMunicipality } from "@/common/domain/types";
import { UpdateMunicipalityDto } from "@/common/infrastructure/dtos";
import {
  MunicipalityEntityRepository,
  ProvinceDtoRepository,
} from "@/common/infrastructure/persistence/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Types } from "mongoose";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateMunicipalityCommand } from "../../operations";

@CommandHandler(UpdateMunicipalityCommand)
export class UpdateMunicipalityCommandHandler
  implements ICommandHandler<UpdateMunicipalityCommand>
{
  constructor(
    private readonly _municipalityRepository: MunicipalityEntityRepository,
    private readonly _provinceRepository: ProvinceDtoRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getMunicipality(
    _id: string,
    i18n: I18nContext,
  ): Promise<Municipality> {
    const municipality = await this._municipalityRepository.findByValue(
      _id,
      "_id",
    );

    if (!municipality)
      throw new NotFoundException(
        i18n
          ? i18n.t(MunicipalityTranslations.NOT_FOUND)
          : this._i18n.t(MunicipalityTranslations.NOT_FOUND),
      );

    return municipality;
  }

  private async mapProvince(
    provinceId: Types.ObjectId,
    municipality: Municipality,
    i18n: I18nContext,
  ): Promise<void> {
    const province = await this._provinceRepository.getById(String(provinceId));

    if (!province)
      throw new NotFoundException(
        i18n
          ? i18n.t(ProvinceTranslations.NOT_FOUND)
          : this._i18n.t(ProvinceTranslations.NOT_FOUND),
      );

    municipality.setProvince({
      _id: provinceId,
      value: province.name,
    });
  }

  private async checkDuplicates(
    municipality: Municipality,
    updateMunicipalityDto: UpdateMunicipalityDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound = await this._municipalityRepository.findOneEntity({
      name: updateMunicipalityDto.name,
    });

    const exists = entityFound && entityFound.getId() !== municipality.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(MunicipalityTranslations.NAME_DUPLICATE)
          : this._i18n.t(MunicipalityTranslations.NAME_DUPLICATE),
      );
  }

  async execute({
    _id,
    updateMunicipalityDto,
    i18n,
  }: UpdateMunicipalityCommand): Promise<void> {
    const municipalityFound = await this.getMunicipality(_id, i18n);

    await this.checkDuplicates(municipalityFound, updateMunicipalityDto, i18n);

    const municipality =
      this.eventPublisher.mergeObjectContext(municipalityFound);

    if (updateMunicipalityDto.province)
      await this.mapProvince(
        new Types.ObjectId(updateMunicipalityDto.province),
        municipality,
        i18n,
      );

    municipality.updateMunicipality(
      updateMunicipalityDto as unknown as IMunicipality,
    );

    municipality.apply(
      new MunicipalityUpdatedEvent(
        municipality.getId(),
        municipality.getName(),
      ),
    );

    await this._municipalityRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      municipality,
    );

    municipality.commit();
  }
}
