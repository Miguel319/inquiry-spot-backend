export { VehicleTypeCreatedEventHandler } from "./vehicle-type-created-event.handler";
export { VehicleTypeUpdatedEventHandler } from "./vehicle-type-updated-event.handler";

import { VehicleTypeCreatedEventHandler } from "./vehicle-type-created-event.handler";
import { VehicleTypeUpdatedEventHandler } from "./vehicle-type-updated-event.handler";

export const VehicleTypesEventHandlers = [
  VehicleTypeCreatedEventHandler,
  VehicleTypeUpdatedEventHandler,
];
