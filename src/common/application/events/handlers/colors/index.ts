import { ColorCreatedEventHandler } from "./color-created-event.handler";
import { ColorUpdatedEventHandler } from "./color-updated-event.handler";

export { ColorCreatedEventHandler } from "./color-created-event.handler";
export { ColorUpdatedEventHandler } from "./color-updated-event.handler";

export const ColorEventHandlers = [
  ColorCreatedEventHandler,
  ColorUpdatedEventHandler,
];
