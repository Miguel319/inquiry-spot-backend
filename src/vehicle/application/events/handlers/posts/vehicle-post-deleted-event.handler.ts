import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { VehiclePostDeletedEvent } from "../../operations";

@EventsHandler(VehiclePostDeletedEvent)
export class VehiclePostDeletedEventHandler
  implements IEventHandler<VehiclePostDeletedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ vehiclePostId, newName }: VehiclePostDeletedEvent) {
    this._logger.log(
      "Vehicle post deletion",
      `✅ New vehicle post deleted successfully! ID = ${vehiclePostId}. Name = ${newName.en} `,
    );
  }
}
