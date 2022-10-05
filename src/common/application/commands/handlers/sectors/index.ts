import { CreateSectorCommandHandler } from "./create-sector-command.handler";
import { UpdateSectorCommandHandler } from "./update-sector-command.handler";
import { DeleteSectorCommandHandler } from "./delete-sector-command.handler";

export { CreateSectorCommandHandler } from "./create-sector-command.handler";
export { UpdateSectorCommandHandler } from "./update-sector-command.handler";
export { DeleteSectorCommandHandler } from "./delete-sector-command.handler";

export const SectorsCommandHandlers = [
  CreateSectorCommandHandler,
  UpdateSectorCommandHandler,
  DeleteSectorCommandHandler,
];
