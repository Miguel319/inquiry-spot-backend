export { CreatePropertyTypeCommandHandler } from "./create-property-type-command.handler";
export { UpdatePropertyTypeCommandHandler } from "./update-property-type-command.handler";
export { DeletePropertyTypeCommandHandler } from "./delete-property-type-command.handler";

import { CreatePropertyTypeCommandHandler } from "./create-property-type-command.handler";
import { UpdatePropertyTypeCommandHandler } from "./update-property-type-command.handler";
import { DeletePropertyTypeCommandHandler } from "./delete-property-type-command.handler";

export const PropertyTypesCommandHandlers = [
  CreatePropertyTypeCommandHandler,
  DeletePropertyTypeCommandHandler,
  UpdatePropertyTypeCommandHandler,
];
