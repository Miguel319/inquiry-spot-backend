import { TractionFactory } from "@/vehicle-post/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateTractionCommand } from "../..";

@CommandHandler(CreateTractionCommand)
export class CreateTractionCommandHandler
  implements ICommandHandler<CreateTractionCommand>
{
  constructor(
    private readonly tractionFactory: TractionFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createTractionDto,
    i18n,
  }: CreateTractionCommand): Promise<void> {
    const traction = this.eventPublisher.mergeObjectContext(
      await this.tractionFactory.create(createTractionDto, i18n),
    );

    traction.commit();
  }
}
