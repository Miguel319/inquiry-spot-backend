export { CreateVehicleStatusCommandHandler } from "./create-vehicle-status-command.handler";
export { UpdateVehicleStatusCommandHandler } from "./update-vehicle-status-command.handler";
export { DeleteVehicleStatusCommandHandler } from "./delete-vehicle-status-command.handler";

import { CreateVehicleStatusCommandHandler } from "./create-vehicle-status-command.handler";
import { UpdateVehicleStatusCommandHandler } from "./update-vehicle-status-command.handler";
import { DeleteVehicleStatusCommandHandler } from "./delete-vehicle-status-command.handler";

export const VehicleStatussCommandHandlers = [
  CreateVehicleStatusCommandHandler,
  DeleteVehicleStatusCommandHandler,
  UpdateVehicleStatusCommandHandler,
];
