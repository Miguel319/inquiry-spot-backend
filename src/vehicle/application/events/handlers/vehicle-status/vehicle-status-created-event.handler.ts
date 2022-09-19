import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { VehicleStatusCreatedEvent } from "../..";

@EventsHandler(VehicleStatusCreatedEvent)
export class VehicleStatusCreatedEventHandler
  implements IEventHandler<VehicleStatusCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ vehicleStatusId, name }: VehicleStatusCreatedEvent) {
    this._logger.log(
      "Vehicle status creation",
      `✅ New vehicle status created successfully! ID = ${vehicleStatusId}. Name = ${name}`,
    );
  }
}
