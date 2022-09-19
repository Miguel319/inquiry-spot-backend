import { FuelFactory } from "@/vehicle/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateFuelCommand } from "../..";

@CommandHandler(CreateFuelCommand)
export class CreateFuelCommandHandler
  implements ICommandHandler<CreateFuelCommand>
{
  constructor(
    private readonly fuelFactory: FuelFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createFuelDto, i18n }: CreateFuelCommand): Promise<void> {
    const fuel = this.eventPublisher.mergeObjectContext(
      await this.fuelFactory.create(createFuelDto, i18n),
    );

    fuel.commit();
  }
}
