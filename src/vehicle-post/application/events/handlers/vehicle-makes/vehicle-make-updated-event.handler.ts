import { LoggerService } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { VehicleMakeUpdatedEvent } from "../../operations";

@EventsHandler(VehicleMakeUpdatedEvent)
export class VehicleMakeUpdatedEventHandler
  implements IEventHandler<VehicleMakeUpdatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  public handle({ vehicleMakeId }: VehicleMakeUpdatedEvent) {
    this._logger.log(
      "Vehicle make update",
      `✅ Vehicle Make update successfully! ID = ${vehicleMakeId}`,
    );
  }
}
