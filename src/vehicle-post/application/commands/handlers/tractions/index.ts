export { CreateTractionCommandHandler } from "./create-traction-command.handler";
export { UpdateTractionCommandHandler } from "./update-traction-command.handler";
export { DeleteTractionCommandHandler } from "./delete-traction-command.handler";

import { CreateTractionCommandHandler } from "./create-traction-command.handler";
import { UpdateTractionCommandHandler } from "./update-traction-command.handler";
import { DeleteTractionCommandHandler } from "./delete-traction-command.handler";

export const TractionCommandHandlers = [
  CreateTractionCommandHandler,
  UpdateTractionCommandHandler,
  DeleteTractionCommandHandler,
];
