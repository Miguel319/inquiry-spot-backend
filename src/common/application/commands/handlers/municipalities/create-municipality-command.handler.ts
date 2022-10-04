import { MunicipalityCreatedEvent } from "@/common/application/events";
import {
  IMunicipalitiesService,
  IProvincesService,
} from "@/common/application/services/contracts";
import { MunicipalityFactory } from "@/common/infrastructure/factories";
import { MunicipalityEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateMunicipalityCommand } from "../..";

@CommandHandler(CreateMunicipalityCommand)
export class CreateMunicipalityCommandHandler
  implements ICommandHandler<CreateMunicipalityCommand>
{
  constructor(
    private readonly municipalityFactory: MunicipalityFactory,
    private readonly _municipalityRepository: MunicipalityEntityRepository,
    @Inject("IMunicipalitiesService")
    private readonly _municipalityService: IMunicipalitiesService,
    @Inject("IProvincesService")
    private readonly _provinceService: IProvincesService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createMunicipalityDto,
    i18n,
  }: CreateMunicipalityCommand): Promise<void> {
    const municipality = this.eventPublisher.mergeObjectContext(
      await this.municipalityFactory.create(createMunicipalityDto, i18n),
    );

    const province = await this._provinceService.findById(
      createMunicipalityDto.province,
      i18n,
    );

    await this._municipalityService.mapMunicipalityToProvince(
      province,
      municipality,
    );

    await this._municipalityRepository.create(municipality);

    await this._municipalityService.mapProvinceToMinucipality(
      province,
      municipality,
    );

    municipality.apply(
      new MunicipalityCreatedEvent(
        municipality.getId(),
        municipality.getName(),
      ),
    );

    municipality.commit();
  }
}
