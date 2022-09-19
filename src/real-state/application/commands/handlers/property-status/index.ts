export { CreatePropertyStatusCommandHandler } from "./create-property-status-command.handler";
export { UpdatePropertyStatusCommandHandler } from "./update-property-status-command.handler";
export { DeletePropertyStatusCommandHandler } from "./delete-property-status-command.handler";

import { CreatePropertyStatusCommandHandler } from "./create-property-status-command.handler";
import { UpdatePropertyStatusCommandHandler } from "./update-property-status-command.handler";
import { DeletePropertyStatusCommandHandler } from "./delete-property-status-command.handler";

export const PropertyStatusCommandHandlers = [
  CreatePropertyStatusCommandHandler,
  DeletePropertyStatusCommandHandler,
  UpdatePropertyStatusCommandHandler,
];
