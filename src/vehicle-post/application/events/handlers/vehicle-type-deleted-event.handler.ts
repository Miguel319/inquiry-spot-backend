import { LoggerService } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import {
  VehicleTypeDeletedEvent,
  VehicleTypeUpdatedEvent,
} from "../operations";

@EventsHandler(VehicleTypeDeletedEvent)
export class VehicleTypeDeletedEventHandler
  implements IEventHandler<VehicleTypeUpdatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ vehicleTypeId }: VehicleTypeDeletedEvent) {
    this._logger.log(
      "Vehicle type deletion",
      `✅ New vehicle type deleted successfully!. ID = ${vehicleTypeId}. `,
    );
  }
}
