import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { VehicleMakeCreatedEvent } from "../../operations";

@EventsHandler(VehicleMakeCreatedEvent)
export class VehicleMakeCreatedEventHandler
  implements IEventHandler<VehicleMakeCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  public handle({ vehicleMakeId }: VehicleMakeCreatedEvent) {
    this._logger.log(
      "Vehicle make creation",
      `✅ Vehicle Make created successfully! ID = ${vehicleMakeId}`,
    );
  }
}
