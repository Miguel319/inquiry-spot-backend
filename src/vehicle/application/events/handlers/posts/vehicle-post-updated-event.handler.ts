import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { VehiclePostUpdatedEvent } from "../../operations";

@EventsHandler(VehiclePostUpdatedEvent)
export class VehiclePostUpdatedEventHandler
  implements IEventHandler<VehiclePostUpdatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ vehiclePostId }: VehiclePostUpdatedEvent) {
    this._logger.log(
      "Vehicle post update",
      `✅ New vehicle post updated successfully! ID = ${vehiclePostId}. `,
    );
  }
}
