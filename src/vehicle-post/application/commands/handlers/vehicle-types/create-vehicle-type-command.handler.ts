import { VehicleTypeFactory } from "@/vehicle-post/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateVehicleTypeCommand } from "../../operations";

@CommandHandler(CreateVehicleTypeCommand)
export class CreateVehicleTypeCommandHandler
  implements ICommandHandler<CreateVehicleTypeCommand>
{
  constructor(
    private readonly vehicleTypeFactory: VehicleTypeFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createVehicleTypeDto,
    i18n,
  }: CreateVehicleTypeCommand): Promise<void> {
    const vehicleType = this.eventPublisher.mergeObjectContext(
      await this.vehicleTypeFactory.create(createVehicleTypeDto, i18n),
    );

    vehicleType.commit();
  }
}
