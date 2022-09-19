export { VehicleStatusCreatedEventHandler } from "./vehicle-status-created-event.handler";
export { VehicleStatusUpdatedEventHandler } from "./vehicle-status-updated-event.handler";

import { VehicleStatusCreatedEventHandler } from "./vehicle-status-created-event.handler";
import { VehicleStatusUpdatedEventHandler } from "./vehicle-status-updated-event.handler";

export const VehicleStatussEventHandlers = [
  VehicleStatusCreatedEventHandler,
  VehicleStatusUpdatedEventHandler,
];
