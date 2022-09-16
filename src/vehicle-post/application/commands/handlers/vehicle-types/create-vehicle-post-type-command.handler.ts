import { VehicleTypeFactory } from "@/vehicle-post/infrastructure/factories/vehicle-type.factory";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateVehiclePostTypeCommand } from "../../operations";

@CommandHandler(CreateVehiclePostTypeCommand)
export class CreateVehiclePostTypeCommandHandler
  implements ICommandHandler<CreateVehiclePostTypeCommand>
{
  constructor(
    private readonly vehicleTypeFactory: VehicleTypeFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createVehicleTypeDto,
    i18n,
  }: CreateVehiclePostTypeCommand): Promise<void> {
    const vehicleType = this.eventPublisher.mergeObjectContext(
      await this.vehicleTypeFactory.create(createVehicleTypeDto, i18n),
    );

    vehicleType.commit();
  }
}
