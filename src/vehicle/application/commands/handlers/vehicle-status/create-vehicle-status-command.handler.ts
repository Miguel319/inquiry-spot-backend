import { VehicleStatusFactory } from "@/vehicle/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateVehicleStatusCommand } from "../..";

@CommandHandler(CreateVehicleStatusCommand)
export class CreateVehicleStatusCommandHandler
  implements ICommandHandler<CreateVehicleStatusCommand>
{
  constructor(
    private readonly vehicleStatusFactory: VehicleStatusFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createVehicleStatusDto,
    i18n,
  }: CreateVehicleStatusCommand): Promise<void> {
    const vehicleStatus = this.eventPublisher.mergeObjectContext(
      await this.vehicleStatusFactory.create(createVehicleStatusDto, i18n),
    );

    vehicleStatus.commit();
  }
}
