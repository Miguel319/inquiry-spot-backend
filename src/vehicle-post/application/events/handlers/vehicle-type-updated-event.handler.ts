import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { VehicleTypeUpdatedEvent } from "../operations";

@EventsHandler(VehicleTypeUpdatedEvent)
export class VehicleTypeUpdatedEventHandler
  implements IEventHandler<VehicleTypeUpdatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ vehicleTypeId }: VehicleTypeUpdatedEvent) {
    this._logger.log(
      "Vehicle type creation",
      `✅ New vehicle type updated successfully!. Vehicle Type ID: ${vehicleTypeId}`,
    );
  }
}
