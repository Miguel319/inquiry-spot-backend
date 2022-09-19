export { CreateVehicleMakeCommandHandler } from "./create-vehicle-make-command.handler";
export { UpdateVehicleMakeCommandHandler } from "./update-vehicle-make-command.handler";
export { DeleteVehicleMakeCommandHandler } from "./delete-vehicle-make-command.handler";

import { CreateVehicleMakeCommandHandler } from "./create-vehicle-make-command.handler";
import { UpdateVehicleMakeCommandHandler } from "./update-vehicle-make-command.handler";
import { DeleteVehicleMakeCommandHandler } from "./delete-vehicle-make-command.handler";

export const VehicleMakesCommandHandlers = [
  CreateVehicleMakeCommandHandler,
  UpdateVehicleMakeCommandHandler,
  DeleteVehicleMakeCommandHandler,
];
