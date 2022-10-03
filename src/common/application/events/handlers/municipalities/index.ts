import { MunicipalityCreatedEventHandler } from "./municipality-created-event.handler";
import { MunicipalityUpdatedEventHandler } from "./province-updated-event.handler";

export { MunicipalityCreatedEventHandler } from "./municipality-created-event.handler";
export { MunicipalityUpdatedEventHandler } from "./province-updated-event.handler";

export const MunicipalitiesEventHandlers = [
  MunicipalityCreatedEventHandler,
  MunicipalityUpdatedEventHandler,
];
