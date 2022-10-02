import { MunicipalityFactory } from "@/common/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateMunicipalityCommand } from "../..";

@CommandHandler(CreateMunicipalityCommand)
export class CreateMunicipalityCommandHandler
  implements ICommandHandler<CreateMunicipalityCommand>
{
  constructor(
    private readonly municipalityFactory: MunicipalityFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createMunicipalityDto,
    i18n,
  }: CreateMunicipalityCommand): Promise<void> {
    const municipality = this.eventPublisher.mergeObjectContext(
      await this.municipalityFactory.create(createMunicipalityDto, i18n),
    );

    municipality.commit();
  }
}
