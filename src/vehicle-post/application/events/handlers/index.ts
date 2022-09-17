export * from "./vehicle-type";

import {
  VehicleTypeCreatedEventHandler,
  VehicleTypeUpdatedEventHandler,
} from "./vehicle-type";

export const VehicleTypesEventHandlers = [
  VehicleTypeCreatedEventHandler,
  VehicleTypeUpdatedEventHandler,
];
