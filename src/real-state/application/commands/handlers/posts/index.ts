export { CreatePropertyPostCommandHandler } from "./create-property-post-command.handler";
export { UpdatePropertyPostCommandHandler } from "./update-property-post-command.handler";
export { DeletePropertyPostCommandHandler } from "./delete-property-post-command.handler";

import { CreatePropertyPostCommandHandler } from "./create-property-post-command.handler";
import { UpdatePropertyPostCommandHandler } from "./update-property-post-command.handler";
import { DeletePropertyPostCommandHandler } from "./delete-property-post-command.handler";

export const PropertyPostCommandHandlers = [
  CreatePropertyPostCommandHandler,
  UpdatePropertyPostCommandHandler,
  DeletePropertyPostCommandHandler,
];
