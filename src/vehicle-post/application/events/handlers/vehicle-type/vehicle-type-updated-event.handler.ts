import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { VehicleTypeUpdatedEvent } from "../../operations/vehicle-type";

@EventsHandler(VehicleTypeUpdatedEvent)
export class VehicleTypeUpdatedEventHandler
  implements IEventHandler<VehicleTypeUpdatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ vehicleTypeId, newName }: VehicleTypeUpdatedEvent) {
    this._logger.log(
      "Vehicle type update",
      `✅ New vehicle type updated successfully!. ID = ${vehicleTypeId}. Name = ${newName} `,
    );
  }
}
