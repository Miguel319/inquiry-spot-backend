export { CreateVehiclePostCommandHandler } from "./create-vehicle-post-command.handler";
export { UpdateVehiclePostCommandHandler } from "./update-vehicle-post-command.handler";
export { DeleteVehiclePostCommandHandler } from "./delete-vehicle-post-command.handler";

import { CreateVehiclePostCommandHandler } from "./create-vehicle-post-command.handler";
import { UpdateVehiclePostCommandHandler } from "./update-vehicle-post-command.handler";
import { DeleteVehiclePostCommandHandler } from "./delete-vehicle-post-command.handler";

export const VehiclePostCommandHandlers = [
  CreateVehiclePostCommandHandler,
  UpdateVehiclePostCommandHandler,
  DeleteVehiclePostCommandHandler,
];
