export { VehiclePostCreatedEventHandler } from "./vehicle-post-created-event.handler";
export { VehiclePostUpdatedEventHandler } from "./vehicle-post-updated-event.handler";
export { VehiclePostDeletedEventHandler } from "./vehicle-post-deleted-event.handler";

import { VehiclePostCreatedEventHandler } from "./vehicle-post-created-event.handler";
import { VehiclePostUpdatedEventHandler } from "./vehicle-post-updated-event.handler";
import { VehiclePostDeletedEventHandler } from "./vehicle-post-deleted-event.handler";

export const VehiclePostEventHandlers = [
  VehiclePostCreatedEventHandler,
  VehiclePostUpdatedEventHandler,
  VehiclePostDeletedEventHandler,
];
