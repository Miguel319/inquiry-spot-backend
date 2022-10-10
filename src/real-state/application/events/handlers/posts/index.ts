export { PropertyPostCreatedEventHandler } from "./property-post-created-event.handler";
export { PropertyPostUpdatedEventHandler } from "./property-post-updated-event.handler";

import { PropertyPostCreatedEventHandler } from "./property-post-created-event.handler";
import { PropertyPostUpdatedEventHandler } from "./property-post-updated-event.handler";

export const PropertyPostEventHandlers = [
  PropertyPostCreatedEventHandler,
  PropertyPostUpdatedEventHandler,
];
