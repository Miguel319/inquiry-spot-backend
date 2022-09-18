import { TransmissionFactory } from "@/vehicle-post/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateTransmissionCommand } from "../..";

@CommandHandler(CreateTransmissionCommand)
export class CreateTransmissionCommandHandler
  implements ICommandHandler<CreateTransmissionCommand>
{
  constructor(
    private readonly vehicleTypeFactory: TransmissionFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createTransmissionDto,
    i18n,
  }: CreateTransmissionCommand): Promise<void> {
    const vehicleType = this.eventPublisher.mergeObjectContext(
      await this.vehicleTypeFactory.create(createTransmissionDto, i18n),
    );

    vehicleType.commit();
  }
}
