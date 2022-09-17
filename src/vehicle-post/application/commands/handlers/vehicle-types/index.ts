export { CreateVehicleTypeCommandHandler } from "./create-vehicle-type-command.handler";
export { UpdateVehicleTypeCommandHandler } from "./update-vehicle-type-command.handler";
export { DeleteVehicleTypeCommandHandler } from "./delete-vehicle-type-command.handler";

import { CreateVehicleTypeCommandHandler } from "./create-vehicle-type-command.handler";
import { UpdateVehicleTypeCommandHandler } from "./update-vehicle-type-command.handler";
import { DeleteVehicleTypeCommandHandler } from "./delete-vehicle-type-command.handler";

export const VehicleTypesCommandHandlers = [
  CreateVehicleTypeCommandHandler,
  DeleteVehicleTypeCommandHandler,
  UpdateVehicleTypeCommandHandler,
];
