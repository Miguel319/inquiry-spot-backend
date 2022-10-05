import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { VehiclePostCreatedEvent } from "../..";

@EventsHandler(VehiclePostCreatedEvent)
export class VehiclePostCreatedEventHandler
  implements IEventHandler<VehiclePostCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ vehiclePostId }: VehiclePostCreatedEvent) {
    this._logger.log(
      "Vehicle post creation",
      `✅ New vehicle post created successfully! ID = ${vehiclePostId}.`,
    );
  }
}
