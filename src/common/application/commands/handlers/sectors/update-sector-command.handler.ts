import { SectorUpdatedEvent } from "@/common/application/events";
import {
  ISectorsService,
  IMunicipalitiesService,
} from "@/common/application/services/contracts";
import { SectorTranslations } from "@/common/application/translations";
import { Sector, Municipality } from "@/common/domain/entities";
import { ISector } from "@/common/domain/types";
import { UpdateSectorDto } from "@/common/infrastructure/dtos";
import { SectorEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateSectorCommand } from "../../operations";

@CommandHandler(UpdateSectorCommand)
export class UpdateSectorCommandHandler
  implements ICommandHandler<UpdateSectorCommand>
{
  constructor(
    private readonly _sectorRepository: SectorEntityRepository,
    @Inject("ISectorsService")
    private readonly _sectorService: ISectorsService,
    @Inject("IMunicipalitiesService")
    private readonly _municipalityService: IMunicipalitiesService,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async checkDuplicates(
    sector: Sector,
    updateSectorDto: UpdateSectorDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound = await this._sectorRepository.findOneEntity({
      name: updateSectorDto.name,
    });

    const exists = entityFound && entityFound.getId() !== sector.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(SectorTranslations.NAME_DUPLICATE)
          : this._i18n.t(SectorTranslations.NAME_DUPLICATE),
      );
  }

  async getRelatedMunicipality(
    sector: Sector,
    dto: UpdateSectorDto,
    i18n: I18nContext,
  ): Promise<Municipality> {
    const municipality = await this._municipalityService.findById(
      dto.municipality,
      i18n,
    );

    await this._sectorService.mapSectorToMunicipality(
      municipality,
      sector,
      true,
    );

    return municipality;
  }

  async execute({
    _id,
    updateSectorDto: dto,
    i18n,
  }: UpdateSectorCommand): Promise<void> {
    const sectorFound = await this._sectorService.findById(_id, i18n);

    if (sectorFound.getName() !== dto.name)
      await this.checkDuplicates(sectorFound, dto, i18n);

    const sector = this.eventPublisher.mergeObjectContext(sectorFound);

    const shouldUpdateReferences =
      String(dto?.municipality) !== String(sector.getMunicipality()._id);

    if (shouldUpdateReferences)
      await this._municipalityService.removeSector(sector, i18n);

    const municipality = shouldUpdateReferences
      ? await this.getRelatedMunicipality(sector, dto, i18n)
      : null;

    if (municipality)
      await this._sectorService.mapMunicipalityToSector(municipality, sector);

    sector.updateSector(dto as unknown as ISector);

    await this._sectorRepository.findOneAndReplaceByValue(_id, "_id", sector);

    sector.apply(new SectorUpdatedEvent(sector.getId(), sector.getName()));

    sector.commit();
  }
}
