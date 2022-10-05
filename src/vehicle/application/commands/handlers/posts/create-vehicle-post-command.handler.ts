import { VehiclePostFactory } from "@/vehicle/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateVehiclePostCommand } from "../..";

@CommandHandler(CreateVehiclePostCommand)
export class CreateVehiclePostCommandHandler
  implements ICommandHandler<CreateVehiclePostCommand>
{
  constructor(
    private readonly tractionFactory: VehiclePostFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createVehiclePostDto,
    i18n,
  }: CreateVehiclePostCommand): Promise<void> {
    const traction = this.eventPublisher.mergeObjectContext(
      await this.tractionFactory.create(createVehiclePostDto, i18n),
    );

    traction.commit();
  }
}
