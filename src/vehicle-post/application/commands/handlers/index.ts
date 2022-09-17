export * from "./vehicle-types";

import {
  CreateVehicleTypeCommandHandler,
  DeleteVehicleTypeCommandHandler,
  UpdateVehicleTypeCommandHandler,
} from "./vehicle-types";

export const VehicleTypesCommandsHandlers = [
  CreateVehicleTypeCommandHandler,
  DeleteVehicleTypeCommandHandler,
  UpdateVehicleTypeCommandHandler,
];
