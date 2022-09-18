import { LoggerService } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { VehicleMakeDeletedEvent } from "../../operations";

@EventsHandler(VehicleMakeDeletedEvent)
export class VehicleMakeDeletedEventHandler
  implements IEventHandler<VehicleMakeDeletedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  public handle({ vehicleMakeId }: VehicleMakeDeletedEvent) {
    this._logger.log(
      "Vehicle make deletion",
      `✅ Vehicle Make deleted successfully! ID = ${vehicleMakeId}`,
    );
  }
}
