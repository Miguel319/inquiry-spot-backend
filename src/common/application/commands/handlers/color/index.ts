import { CreateColorCommandHandler } from "./create-color-command.handler";
import { UpdateColorCommandHandler } from "./update-color-command.handler";
import { DeleteColorCommandHandler } from "./delete-color-command.handler";

export { CreateColorCommandHandler } from "./create-color-command.handler";
export { UpdateColorCommandHandler } from "./update-color-command.handler";
export { DeleteColorCommandHandler } from "./delete-color-command.handler";

export const ColorsCommandHandlers = [
  CreateColorCommandHandler,
  UpdateColorCommandHandler,
  DeleteColorCommandHandler,
];
