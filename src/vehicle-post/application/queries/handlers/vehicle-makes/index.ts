export { FetchPaginatedVehicleMakesQueryHandler } from "./fetch-paginated-vehicle-makes-query.handler";
export { FetchVehicleMakeByIdQueryHandler } from "./fetch-vehicle-make-by-id-query.handler";

import { FetchPaginatedVehicleMakesQueryHandler } from "./fetch-paginated-vehicle-makes-query.handler";
import { FetchVehicleMakeByIdQueryHandler } from "./fetch-vehicle-make-by-id-query.handler";

export const VehicleMakesQueryHandlers = [
  FetchPaginatedVehicleMakesQueryHandler,
  FetchVehicleMakeByIdQueryHandler,
];
