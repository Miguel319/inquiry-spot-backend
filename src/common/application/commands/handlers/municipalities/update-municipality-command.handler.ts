import { MunicipalityUpdatedEvent } from "@/common/application/events";
import {
  IMunicipalitiesService,
  IProvincesService,
} from "@/common/application/services/contracts";
import { MunicipalityTranslations } from "@/common/application/translations";
import { Municipality, Province } from "@/common/domain/entities";
import { IMunicipality } from "@/common/domain/types";
import { UpdateMunicipalityDto } from "@/common/infrastructure/dtos";
import { MunicipalityEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateMunicipalityCommand } from "../../operations";

@CommandHandler(UpdateMunicipalityCommand)
export class UpdateMunicipalityCommandHandler
  implements ICommandHandler<UpdateMunicipalityCommand>
{
  constructor(
    private readonly _municipalityRepository: MunicipalityEntityRepository,
    @Inject("IMunicipalitiesService")
    private readonly _municipalityService: IMunicipalitiesService,
    @Inject("IProvincesService")
    private readonly _provincesService: IProvincesService,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

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

  async getRelatedProvince(
    municipality: Municipality,
    dto: UpdateMunicipalityDto,
    i18n: I18nContext,
  ): Promise<Province> {
    const province = await this._provincesService.findById(dto.province, i18n);

    await this._municipalityService.mapMunicipalityToProvince(
      province,
      municipality,
      true,
    );

    return province;
  }

  async execute({
    _id,
    updateMunicipalityDto: dto,
    i18n,
  }: UpdateMunicipalityCommand): Promise<void> {
    const municipalityFound = await this._municipalityService.findById(
      _id,
      i18n,
    );

    if (municipalityFound.getName() !== dto.name)
      await this.checkDuplicates(municipalityFound, dto, i18n);

    const municipality =
      this.eventPublisher.mergeObjectContext(municipalityFound);

    const shouldUpdateReferences =
      String(dto?.province) !== String(municipality.getProvince()._id);

    if (shouldUpdateReferences)
      await this._provincesService.removeMunicipality(municipality, i18n);

    const province = shouldUpdateReferences
      ? await this.getRelatedProvince(municipality, dto, i18n)
      : null;

    if (province)
      await this._municipalityService.mapProvinceToMunicipality(
        province,
        municipality,
      );

    municipality.updateMunicipality(dto as unknown as IMunicipality);

    await this._municipalityRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      municipality,
    );

    municipality.apply(
      new MunicipalityUpdatedEvent(
        municipality.getId(),
        municipality.getName(),
      ),
    );

    municipality.commit();
  }
}
