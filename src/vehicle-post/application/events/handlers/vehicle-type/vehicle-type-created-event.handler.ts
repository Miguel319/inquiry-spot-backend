import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { VehicleTypeCreatedEvent } from "../..";

@EventsHandler(VehicleTypeCreatedEvent)
export class VehicleTypeCreatedEventHandler
  implements IEventHandler<VehicleTypeCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ vehicleTypeId, name }: VehicleTypeCreatedEvent) {
    this._logger.log(
      "Vehicle type creation",
      `✅ New vehicle type created successfully! ID = ${vehicleTypeId}. Name = ${name}`,
    );
  }
}
