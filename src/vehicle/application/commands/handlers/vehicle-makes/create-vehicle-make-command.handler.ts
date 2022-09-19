import { VehicleMakeFactory } from "@/vehicle/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateVehicleMakeCommand } from "../..";

@CommandHandler(CreateVehicleMakeCommand)
export class CreateVehicleMakeCommandHandler
  implements ICommandHandler<CreateVehicleMakeCommand>
{
  constructor(
    private vehicleMakeFactory: VehicleMakeFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createVehicleMake,
    i18n,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CreateVehicleMakeCommand): Promise<any> {
    const vehicleMake = this.eventPublisher.mergeObjectContext(
      await this.vehicleMakeFactory.create(createVehicleMake, i18n),
    );

    vehicleMake.commit();
  }
}
