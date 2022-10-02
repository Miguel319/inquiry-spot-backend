import { CreateMunicipalityCommandHandler } from "./create-municipality-command.handler";
import { UpdateMunicipalityCommandHandler } from "./update-municipality-command.handler";
import { DeleteMunicipalityCommandHandler } from "./delete-municipality-command.handler";

export { CreateMunicipalityCommandHandler } from "./create-municipality-command.handler";
export { UpdateMunicipalityCommandHandler } from "./update-municipality-command.handler";
export { DeleteMunicipalityCommandHandler } from "./delete-municipality-command.handler";

export const MunicipalitysCommandHandlers = [
  CreateMunicipalityCommandHandler,
  UpdateMunicipalityCommandHandler,
  DeleteMunicipalityCommandHandler,
];
