import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { FuelCreatedEvent } from "../../operations";

@EventsHandler(FuelCreatedEvent)
export class FuelCreatedEventHandler
  implements IEventHandler<FuelCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ fuelId, name }: FuelCreatedEvent) {
    this._logger.log(
      "Fuel creation",
      `✅ New fuel type created successfully! ID = ${fuelId}. Name = ${name}`,
    );
  }
}
