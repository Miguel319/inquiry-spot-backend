import { TransmissionFactory } from "@/vehicle-post/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateTransmissionCommand } from "../..";

@CommandHandler(CreateTransmissionCommand)
export class CreateTransmissionCommandHandler
  implements ICommandHandler<CreateTransmissionCommand>
{
  constructor(
    private readonly transmissionFactory: TransmissionFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createTransmissionDto,
    i18n,
  }: CreateTransmissionCommand): Promise<void> {
    const transmission = this.eventPublisher.mergeObjectContext(
      await this.transmissionFactory.create(createTransmissionDto, i18n),
    );

    transmission.commit();
  }
}
