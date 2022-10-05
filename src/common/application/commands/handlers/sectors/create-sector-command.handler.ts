import { SectorCreatedEvent } from "@/common/application/events";
import {
  IMunicipalitiesService,
  ISectorsService,
} from "@/common/application/services/contracts";
import { SectorFactory } from "@/common/infrastructure/factories";
import { SectorEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateSectorCommand } from "../..";

@CommandHandler(CreateSectorCommand)
export class CreateSectorCommandHandler
  implements ICommandHandler<CreateSectorCommand>
{
  constructor(
    private readonly sectorFactory: SectorFactory,
    private readonly _sectorRepository: SectorEntityRepository,
    @Inject("ISectorsService")
    private readonly _sectorService: ISectorsService,
    @Inject("IMunicipalitiesService")
    private readonly _municipalityService: IMunicipalitiesService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createSectorDto, i18n }: CreateSectorCommand): Promise<void> {
    const sector = this.eventPublisher.mergeObjectContext(
      await this.sectorFactory.create(createSectorDto, i18n),
    );

    const municipality = await this._municipalityService.findById(
      createSectorDto.municipality,
      i18n,
    );

    await this._sectorService.mapSectorToMunicipality(municipality, sector);

    await this._sectorRepository.create(sector);

    await this._sectorService.mapMunicipalityToSector(municipality, sector);

    sector.apply(new SectorCreatedEvent(sector.getId(), sector.getName()));

    sector.commit();
  }
}
