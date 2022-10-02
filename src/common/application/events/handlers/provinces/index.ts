import { ProvinceCreatedEventHandler } from "./province-created-event.handler";
import { ProvinceUpdatedEventHandler } from "./province-updated-event.handler";

export { ProvinceCreatedEventHandler } from "./province-created-event.handler";
export { ProvinceUpdatedEventHandler } from "./province-updated-event.handler";

export const ProvincesEventHandlers = [
  ProvinceCreatedEventHandler,
  ProvinceUpdatedEventHandler,
];
