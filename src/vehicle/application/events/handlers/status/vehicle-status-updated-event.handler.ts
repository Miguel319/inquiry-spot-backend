import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { VehicleStatusUpdatedEvent } from "../../operations";

@EventsHandler(VehicleStatusUpdatedEvent)
export class VehicleStatusUpdatedEventHandler
  implements IEventHandler<VehicleStatusUpdatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ vehicleStatusId, newName }: VehicleStatusUpdatedEvent) {
    this._logger.log(
      "Vehicle status update",
      `✅ New vehicle status updated successfully! ID = ${vehicleStatusId}. Name = ${newName.en} `,
    );
  }
}
