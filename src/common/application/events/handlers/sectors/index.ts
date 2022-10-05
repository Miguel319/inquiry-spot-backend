import { SectorCreatedEventHandler } from "./municipality-created-event.handler";
import { SectorUpdatedEventHandler } from "./province-updated-event.handler";

export { SectorCreatedEventHandler } from "./municipality-created-event.handler";
export { SectorUpdatedEventHandler } from "./province-updated-event.handler";

export const SectorsEventHandlers = [
  SectorCreatedEventHandler,
  SectorUpdatedEventHandler,
];
