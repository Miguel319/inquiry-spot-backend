export { CreateFuelCommandHandler } from "./create-fuel-command.handler";
export { UpdateFuelCommandHandler } from "./update-fuel-command.handler";

import { CreateFuelCommandHandler } from "./create-fuel-command.handler";
import { UpdateFuelCommandHandler } from "./update-fuel-command.handler";

export const FuelCommandHandlers = [
  CreateFuelCommandHandler,
  UpdateFuelCommandHandler,
];
